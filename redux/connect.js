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