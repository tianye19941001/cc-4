const render = require('./render').render;
const renderComponent = require('./render').renderComponent;
const Component = require('./render').Component;
const diff = require('./diff');

function createElement(tag, attrs, ...children) {
    return{
        tag,
        attrs,
        children
    }
}

const React = {
    createElement,
    Component
}

function Welcome(props) {
    return <h1>hello,{props.name}</h1>;
}

function Welcome2 extends React.Component{
    render() {
        return<h1>hello-components2,{this.props.name}</h1>
    }
}

const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = '';
        return render(vnode, container);
    }
}

ReactDOM.render = {
    <div>
        <Welcome name="tianye1"/>
        <Welcome name="tianye2"/>
        <Welcome2 name="tianye3"/>
    </div>,
    document.getElementById('root');
}

class Counter extends React.Component {
    constructor(props) {
        supe(props);

        this.state = {
            num = 0
        }
    }

    componentWillUpdate() {
        console.log('update');
    }

    componentWillMount() {
        console.log('mount');
    }

    onClick() {
        this.setState({
            num: this.state.num ++
        })
    }

    render() {
        return (
            <div onClick={this.onClick.bind(this)}>
                <h1>number: {this.state.num}</h1>
                <button>add</button>
            </div>
        )
    }
}

React.render(
    <Counter />,
    document.getElementById('main')
)

//test diff

// var d1 = (
//     <div>
//         <h1>123</h1>
//         <span>r</span>
//     </div>
// )
// var d2 = (
//     <div>
//         <h1>456</h1>
//         <p>r</p>
//     </div>
// )

// var a = diff(d1,d2)
// console.log(a)
