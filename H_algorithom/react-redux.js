    //本次重点写的是redux模式的应用，react-redux
    /**
     * 讲一下redux的单向数据流动：
     * 通过dispatch一个action在reducer函数里面改变state然后通过store.getState()获取到新的state值进行视图渲染
     * 那么是如何渲染的呢？
     * 用我们的connect高阶组件
     */
    /**
     * 提供一个store
     */
    class Provider extends React.Component{
        // 验证context数据类型
        static childContextTypes={
            store:PropTypes.object,
        };
        /**
         * 返回一个对象，这个对象就是子树的context
         * @returns {{store: ([]|((typedArray: (Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array), index: number, value: number) => number))}}
         */
        getChildContext(){
            return{
                store:this.props.store,
            }
        }
        render(){
            return this.props.children
        }
    }
    // 所谓中间件其实就是对dispatch的一个扩展
    const  reduxLogger=(store)=>{
        return (dispatch)=>{
            return (action)=>{
                console.info(store.getState());
                dispatch(action);
                console.info(store.getState());
            }
        }
    };
    /**
     * 洋葱模型 对函数的缩减：通过compose(f1,f2,f3)(args)===>f3(f2(f1(args)))
     * @returns {function(*=): ...IArguments}
     */
    const compose=function(){
        let args=[...arguments];
        return (arg)=>{
            // 应该是一个缩减的现象
            return args.reduce((prev,next)=>{
                return next(prev);
            },arg);
        }
    };
    /**
     * 添加中间件的函数
     * @param middlewares
     * @returns {function(*): function(*=): (*|{newDispatches: *})}
     */
    const applyMiddlewares=(middlewares)=>{
        return (createStore)=>{
            return (reducers)=>{
                let store=createStore(reducers);
                // 返回的是一系列函数,函数可以进行调用，参数是dispatch
                let chains=middlewares.map(item=>item(store));
                let newDispatches=compose(chains)(store.dispatch);
                return{
                    ...store,
                    newDispatches,
                }
            }
        }
    };
    // react-redux还需要一个connect高阶组件将UI组件和容器组件连起来
    /**
     * 1、从context里获取store
     * 2、在componentWillMount 里通过mapStateToProps获取stateProp的值
     * 3、在componentWillMount 里通过mapDispatchToProps获取dispatchProps的值
     * 4、在componentWillMount 里订阅store的变化
     * 5、将获得的stateProp，dispatchProps，还有自身的props合成一个props传给下面的组件
     * 6,当然其中包含shouldComponentUpdate的性能优化，selectorFactory函数等等
     * @param mapStateToProps
     * @param mapDispatchToProps
     * @returns {{new(): wrapConnectComponent, prototype: wrapConnectComponent}}
     * @constructor
     */
    const Connect=(mapStateToProps,mapDispatchToProps)=>{
        return (wrappedComponent)=>class wrapConnectComponent extends React.Component{
            static contextTypes={
                store:PropTypes.object,
            };
            constructor(props){
                super(props);
                this.state={
                    allProps:{},
                }
            };
            componentWillMount(){
                const {store}=this.context;
                this._updateProps();
                store.subscribe(()=>this._updateProps());
            };
            _updateProps(){
                // 收集所有的props，setState
                const {store}=this.context;
                const stateProps=mapStateToProps?mapStateToProps(store.getState,this.props):{};
                const dispatchProps=mapDispatchToProps?mapDispatchToProps(store.getState,this.props):{};
                this.setState({
                    allProps:{
                        ...this.props,
                        ...stateProps,
                        ...dispatchProps,
                    }
                })
            };
            render(){
                const {allProps}=this.state;
                return(<wrappedComponent {...allProps} />)
            }
        }
    };