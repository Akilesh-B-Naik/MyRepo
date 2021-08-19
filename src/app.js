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
      loading: false
    }

  componentDidMount() {
    console.log("mount executed");
    this.getPosts();
    window.addEventListener("scroll", (event) => {
      console.log("event listener executed");
      console.log(document.body.scrollHeight);
      console.log(window.innerHeight + window.scrollY);
      if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= 30) {
        this.getPosts();
      }
    });
  }

  getPosts = async () => {
    console.log("get post executed")
    const { pageNo, total, users, loading } = this.state;
    if (loading) {
      return
    }
    this.setState({ loading: true })
    if (total === undefined || users.length < total) {
      const val = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + pageNo)
      const response = await val.json();
      const totalCount = val.headers.get("x-total-count");

      this.setState({
        total: totalCount,
        pageNo: pageNo + 1,
        users: users.concat(response),
        loading: false
      })
    }
  }
  render() {

    const { users } = this.state;
    //const val=this.state;
    return (
      <div>
        <table id="users" border='1'>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>BODY</td>
            </tr>

            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>{user.body}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
    )
  }
}



ReactDOM.render(<Table />, document.getElementById('app'));