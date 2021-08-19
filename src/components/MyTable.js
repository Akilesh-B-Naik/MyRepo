
import React from 'react';


class Table extends React.Component {

    state =
      {
        users: [],
        total: undefined,
        pageNo: 1,
        loading: false
      }
  
    componentDidMount() {
     
      this.getPosts();
      window.addEventListener("scroll", (event) => {
      
        if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= 30) {
          this.getPosts();
        }
      });
    }
  
    getPosts = async () => {
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

  export default Table;