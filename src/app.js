import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import './styles/Styles.scss';
import Table from './components/MyTable';

class CompanyApi extends React.Component {
  state = {
    results:[],
    loading: false,
    total: undefined
  }
  componentDidMount() {
    this.getPosts();
    window.addEventListener("scroll", (event) => {
      if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= 40) {
        this.getPosts();
      }
    });
    
  }
  getPosts = async () => {
    const {results,loading,total} = this.state;
    if (loading) {
      return
    }
    this.setState({ loading: true });
    if (total === undefined || results.length < total) {
    const val = await fetch('https://tracxn.com/api/2.2/companies', {
      method: "POST",
      headers: {
        "accessToken": "a7998d3c-8028-486d-8a29-50ceb39c636b",
        "Content-Type": "application/json",
        "X-Request-Source": "Akilesh Assignment Team-AppAqua"
      },
      body: JSON.stringify({
        "filter": {
          "country": ["India"],
        },
        "from":results.length,
        "size":20
      })
    })
  
    const {total_count,result}= await val.json();
    this.setState({total: total_count,results:results.concat(result), loading: false});
  }}

  render() {
    const {results,total}=this.state;
    return (<div>
      <table id="users" border='2'>
            <thead>
              <tr >
                <th>Number</th>
                <th>ID</th>
                <th>Title</th>
                <th>BODY</th>
                <th>STATE</th>
              </tr>
              </thead>
              <tbody>
              {results.map(({id,name,domain,location:{state}={}},index)=>
                <tr key={index} >
                  <td>{index+1}</td>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{domain}</td>
                  <td>{state}</td>
                </tr>
              )}
            </tbody>
          </table>
          {}
      </div>);

  }
}
ReactDOM.render(<Table />, document.getElementById('app'));