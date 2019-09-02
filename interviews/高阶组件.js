/**
 * hoc就是传入一个组件 返回修改后的组件或者一个新的组件
 * @param Component
 * @returns {{new(*=): WrappedComponent, prototype: WrappedComponent}}
 */
const hoc=Component=>{
    return class WrappedComponent extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <Component {...props} />
        }
    }
};
/**
 * 以下为connect高阶组件的原理
 */
const connect=(mapStateToProps,mapDispatchToProps){
    return (wrappedComponent) => class wrappedConnectComponent extends React.component {
        static contextTypes = {
            store: PropTypes.object,
        }

        constructor(props) {
            super(props);
            this.state = {
                allProps: {},
            }
        }

        componentWillMount() {
            const {store} = this.context;
            this._updateProps();
            // 订阅props的改变，每当store中数据发生变化的时候，props也跟着及时改变
            store.subscribe(() => this._updateProps());
        }

        _updateProps() {
            const {store} = this.context;
            const stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {};
            const dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.getState(), this.props) : {};
            this.setStae({
                allProps: {
                    ...this.props,
                    ...stateProps,
                    ...dispatchProps,
                }
            })
        }

        render() {
            const {allProps} = this.state;
            return <wrappedComponent {...allProps}/>
        }
    }
}
const FromProvider=fields=>{
    // 解构出fields中的初始数据
    const initialForm={};
    Object.keys(fields).forEach(key=>{
        initialForm[key]=fields[key];
    });
    return Component=>class newComponent extends React.Component{
        constructor(props){
            super(props);
            this.state={
                form:initialFormData
            }
        }
        onFormChange(fieldName,val){
            const {form}=this.state;
            this.setState({
                form:{
                    ...form,
                    // 创建了一个对象对初始数据覆盖
                    [fieldName]:val,
                }
            })
        }
        render(){
            const {form}=this.state;
            return(
                <Component form={form} onFormChange={this.onFormChange} />
            )
        }
    }
};