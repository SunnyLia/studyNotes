/* JSX简介 */
// 什么是jsx?
// jsx是JavaScript得语法扩展，可以很好得描述ui应该呈现出它应有交互得本质形式，还可以使react显示更多有用得错误喝警告消息。
// 1、可以在jsx中用大括号{}包裹嵌入表达式
// 2、在编译之后，JSX表达式会被转为普通js函数调用，并且对其取值后得到JS对象
// 3、同一属性不能同时使用引号跟大括号这两种符号，在属性中嵌入js表达式时，不能在大括号外面加上引号。
//    同时，react Dom使用小驼峰命名来定义属性的名称，而不使用HTML属性名称的命名约定。
// 2、使用jsx指定子元素
// 3、jsx可防止注入攻击,在渲染时会默认对输入内容进行转义。
// 4、Babel会把jsx转译成名为React.createElement()函数调用。
const name = "JJ Liu";
const ele = <h1 className="greeting">hello,{name}</h1>
// 等效于 
const ele1 = React.createElement(
  'h1',
  { className: 'greeting' },
  'hello,world'
)
// 等效于 
// 如下这些对象被称为"react元素"，描述了我们在屏幕上看到的内容。react通过读取这些对象，然后使用他们来构建DOM以及保持随时更新。
const ele2 = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'hello,world!'
  }
}



/*元素渲染 */
ReactDOM.render(ele, document.getElementById("root"))
reactDOM.render()可以将一个元素渲染为DOM
// react元素是不可变对象，一旦被创建，就无法更改它的子元素或属性。
// 所以，更新Ui(已渲染的元素)唯一的方式是创建一个全新的元素，并将其传入ReactDOM.render()中
// 但，React Dom会将元素和它的子元素与他们之前的状态进行比较，并只会只会更新实际改变了的内容（它需要更新的部分）来使DOM达到预期的状态。



/*组件&props */
// 函数组件
// 接收唯一带有数据的props对象，并返回一个React元素。
function Welcome(props) {
  return <h1>hello,{props.name}</h1>
}
// ES6 class组件
class Welcom extends React.Component {
  render() {
    return <h1>hello,{this.props.name}</h1>
  }
}
// 自定义组件
// react 会将JSX所接收的属性转换为单个对象传递给组件，这个对象称为“props”;
function Welcom(props) {
  return <h1>hello,{props.name}</h1>
}
const ele = <Welcome name="Sara" />;
ReactDOM.render(ele, document.getElementById("root"))

// 组合组件
// 组件可以在其输出中引用其他组件。
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
//Props是只读的，组件不能修改自身的props
//纯函数：函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果

/* state&生命周期 */
//state与props类似，但是state是私有的，并且完全受控于当前组件
class Clock extends React.Component {
  // 将 props 传递到父类的构造函数中
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

//使用state的注意事项：
//1）不要直接修改state，因为不会重新渲染组件，而是通过this.setState() 来更新组件state
//2）state的更新可能是异步的
    // 处于性能考虑，React可能会把多个setState（）调用合并成一个调用。
    // 因为this.props和this.state可能会异步更新，所以不能依赖他们的值来更新下一个状态。
  //解决方法
    //让setState（）接收一个函数而不是一个对象。这个函数用上一个state作为第一个参数，将此次更新被应用时的props作为第二个参数：
    // Wrong
    this.setState({
      counter: this.state.counter + this.props.increment,
    });
    // Correct
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));
    // Correct
    this.setState(function(state, props) {
      return {
        counter: state.counter + props.increment
      };
    });
//3)state的更新会被合并
  //因为当调用setState（）的时候，React会把提供的对象合并到当前的state
  //可以分别调用setState（）来单独更新state。
//4）单向数据流（数据是向下流的）
  //组件可以选择把它的state作为props向下传递到他的子组件中
  //同时，子组件本身无法知道接收到的数据是来自父组件的state还是props，还是手动输入的。
  //单向数据流：
    //任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。



/*事件处理 */
//react元素的事件处理和DOM元素的很相似，但是语法上的不同之处：
  //1）React事件的命名采用小驼峰式，而不是纯小写
  //2）使用jsx语法时需要传入一个函数作为事件处理函数，而不是一个字符串
   //例如，传统的 HTML：
    <button onclick="activateLasers()">
      Activate Lasers
    </button>
   //在 React 中略微不同：
    <button onClick={activateLasers}>
      Activate Lasers
    </button>
  // 3）不能通过返回false的方式阻止默认行为，必须使用e.preventDefault()。
// jsx回调函数中的this问题
// 在JavaScript中，class的方法默认不会绑定this。
// 如果忘记绑定this.handleClick并把它传入了onClick，当你调用这个函数的时候this的值为undefined。
// 通常情况下，如果没有在方法后面添加()，例如onClick = {this.handleClick},应该为这个方法绑定this.
// 方法一，使用bind方法
class LoggingButton extends React.Component {
  constructor(props) {
    super(props);
    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 方法二，使用箭头函数
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}

// 方法三，使用 class fields
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 向事件处理程序传递参数
// 方法一，通过箭头函数传递
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  // 方法二，Function.prototype.bind 来实现
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>


/*条件渲染*/
// 方法一，if条件语句
// 方法二，与运算符&&
// 方法三，三目运算符
// 阻止组件不进行任何渲染，可以让 render 方法直接返回 null


/*列表&key*/
//1)key
// key帮助react识别哪些元素改变了，比如被添加或删除，因此，应当给数组中的每一个元素赋予一个确定的标识。
// 一个元素的key最好是在当前列表的兄弟节点之间必须唯一，并不需要在全局中唯一的。通常，使用来自数据id来作为元素的key.

// 在jsx中嵌入map()
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
          value={number} />

      )}
    </ul>
  );
}

/*表单*/
// 受控组件
// 通过将react组件中的state作为唯一数据源，同时控制用户输入过程中表单操作来达到进行更新组件state的目的。
// React以这种方式控制取值的表单输入元素叫做“受控组件”
// 总的来说，我们可以通过<input type="text">, <textarea> 和 <select> 之类的标签的value 属性来实现受控组件
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

//处理多个元素输入
//当需要处理多个input元素时，我们可以给每个元素添加name属性，并让处理函数根据event.target.name的值选择要执行的操作。
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({  //重点在这
      [name]: value  
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}


/*状态提升*/
// 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”


/*组合&继承*/
// 包含关系
// 父组件可以在子组件标签的内部插入具体内容，子组件可以通过prop children来接收并渲染结果
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}


// 在父组件中，可将其他组件名称作为props参数传递到子组件相应的位置
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
