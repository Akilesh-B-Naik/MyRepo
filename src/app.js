// stateless functional component
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import './styles/Styles.scss';

import IndescisionApp from './components/IndecisionApp'



class Table extends React.Component {

  state =
    {
      users: [],
      total: undefined,
      pageNo: 1,
     

    }


  componentDidMount() {
    this.getPosts();
    window.addEventListener("scroll", (event) => {

      if ((document.body.scrollHeight) < (window.innerHeight + window.scrollY)) {
       
        this.getPosts();
      }
    
    });
  }

  getPosts = async () => {
    const { pageNo, total,users } = this.state;
    
   if(total===undefined || users.length<total )
   {
    const val = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + pageNo)
    const response = await val.json();
    const totalCount = val.headers.get("x-total-count");

      this.setState({
        total: totalCount,
        pageNo: pageNo + 1,
        users: users.concat(response)
      })
   }
  }

  render() {

    const { users } = this.state;
    //const val=this.state;
    return (
      <div>

        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.id} {user.title} {user.body}
            </li>
          ))}
        </ul>


      </div>
    )
  }
}



ReactDOM.render(<Table />, document.getElementById('app'));