react is a tree of components where app being root having all components in it

//two ways to create react app
->CRA(Create react app tool)
->(Vite)
//react components consist of html and js 
//react helpes to add dynamic content 

->working of react
app(parent)->homepage(child component) 
->react converts the compnenst to js datastructure ie virtual dom(lighter than action browser dom) consists of nodes 

->react dom hepls in dynamic data updating and then compares with current version of virtual dom with previous virtual dom and then updates the actual dom


Reat is a library only one tool for interative Ui
Additional tools to be used for 
Routing
Http---Axios library
Managing state
Internationalization
Form validation
Animations


Angular/Vue is a framework with different tools

Concepts in react
->State variables (react hooks) are used in current companent to change the current component data 
->consist of two parts varaible and funtion to update state variable for eg: [count,setCout] = useState(0);
->mainly used to perform filtering/sorting in current component

//promises are objects which represents future data after aysnchronous operation (assures resolve using then(),reject using catch(),pending)
//async and await are keywords assined to function which  automatically return promises making feel it is synchronous but it in aync mode