
import React from 'react';


class Table extends React.Component {

    state =
      {
        users: [],
        total: undefined,
        pageNo: 0,
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
        try{
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
        catch(error)
        {
          console.log(error.message);
        }
        
      }
    }
    render() {
  
       
      const { users } = this.state;
     
      //const val=this.state;
      return (
        <div>
          <table id="users" border='1'>
            <thead>
              <tr>
                <td>ID</td>
                <td>Title</td>
                <td>BODY</td>
              </tr>
            </thead>
            <tbody>
              {users.map(({id,title,body}) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  export default Table;