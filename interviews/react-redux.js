/**
 * 下面手写一个react-redux的源码
 */


/**
 * 根据action修改state
 * 疑惑点：对于payload的解构,从用法上讲我认为没有错
 * 查阅后发现一般会指定属性，比如：count:action.payload
 * @param action
 * @param state
 * @returns {{count: number}|{test: string, count: number}}
 */
const reducer=(action,state)=>{
    // todo
    if(!state){
        // without state
        return {
            count:1,
            test:'hello',
        }
    }
    switch(action.type){
        case 'ADD_COUNT':
            return {
                ...state,
                ...action.payload,
            };
        case 'MINUS_COUNT':
            return {
                ...state,
                count:count-1,
            }
    }
};

/**
 * 用来生成store
 * 函数里面直接用state即可
 * @param reducer
 * @returns {{getState: *, dispatch: *, subscribe: *}}
 */
function createStore(reducer){
    let state=null;
    let listeners=[];
    const getState=()=>{
        return state;
    };
    const subscribe=listener=>{
        listeners.push(listener);
        return ()=>{
            return listeners.filter(item=>item!==listener);
        }
    };
    const dispatch=(action)=>{
        state=reducer(action,state);
        listeners.forEach(item=>item());
    };
    return {getState,dispatch,subscribe};
}

/**
 * 一个redux中间件
 * 可以看出来其实是对dispatch的扩展
 * 疑惑点是对store的传入
 * @param store
 * @returns {Function}
 */
const redux_logger=(store)=>{
    let dispatch=store.dispatch();
    return (action)=>{
        console.info(`state变化前：${store.getState()}`);
        store.dispatch(action);
        console.info(`state变化后：${store.getState()}`);
    }
};
/**
 * 多个中间件加到redux中
 * @param mids
 */
const applyMiddlewares=(...mids)=> {
    return createStore=>{
        return reducer=>{
            let store=createStore(reducer);
            let newDispatch=compose(mids)(store);
            return {
                ...store,
                dispatch:newDispatch,
            }
        }
    }
};

/**
 * 给react-redux提供store
 * key：store怎么加到子组件上面去,不该这么问，应该是怎么把子组件的store放在context上面去
 */
 class Provider extends React.Component{
     static childContextTypes={
         store:PropsType.object,
     };
     constructor(props){
         super(props);
     }
     getChildContext(){
         return {
             store:this.props.store,
         };
     }
     render(){
         return this.props.children;
     }
 }

/**
 * connect 高阶组件，从UI组件向容器组件的转变
 * @param mapStateToProps
 * @param mapDispatchToProps
 */
 const connect=(mapStateToProps,mapDispatchToProps)=>{
     return wrappedComponent=>class newComponent extends React.Component{
         static contextTypes={
             store:PropsType.object,
         };
         constructor(props){
             super(props);
             this.state={
                 allProps:{},
             }
         }
         componentWillMount(){
             const {store}=this.context;
             this._updateProps();
             store.subscribe(()=>this._updateProps());
         }
         _updateProps(){
             let {store}=this.context;
             let stateProps=mapStateToProps?mapStateToProps(store.getState()):{};
             let dispatchProps=mapDispatchToProps?mapDispatchToProps(store.getState()):{};
             this.setState({
                 allProps:{
                     ...this.props,
                     ...stateProps,
                     ...dispatchProps,
                 }
             })
         }
         render(){
             const {allProps}=this.state;
             return <wrappedComponent {...allProps}/>
         }
     }
 };
