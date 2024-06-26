import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import BlockUi from 'react-block-ui';
class Test extends Component {
    state = {
        showProfileDrp: false, blocking: false
    }

    toggleUi = (e) => {
        this.setState({ blocking: true })
    }

    render() {
        // let local = localStorage.getItem("admin"); local = JSON.parse(local).admin.admin_dp;
        // let showProfileDrp = (this.state.showProfileDrp) ? <ProfileDropdown /> : null
        // let dp = local ? `http://localhost:4000/${local}` : null
        //   let data = JSON.parse(local).admin.admin_dp; console.log("token",data)
        return (
            <Preloader>
                <Placeholder>
                    <span fadeDuration={10000}>Loading...</span>
                </Placeholder>
                <h1>Welcome to my app!</h1>
                <h2>It's being preloaded!</h2>


                <BlockUi tag="div" blocking={this.state.blocking}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </BlockUi>

                <button className="btn btn-primary" onClick={this.toggleUi}>Hello button</button>
            </Preloader>
        )
    }
}

export default Test


// import React, { Component } from 'react'
// import { Preloader, Placeholder } from 'react-preloading-screen';
// // import '../src/components/style/jquery.dataTables.min.css';

// const $ = require('jquery');
// let dataSet = [
//     ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
//     ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
//     ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
//     ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
//     ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
//     ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
//     ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
//     ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
//     ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
//     ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
//     ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
//     ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
//     ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
//     ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
//     ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
//     ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
//     ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
//     ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
//     ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
//     ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
//     ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
//     ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
//     ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
//     ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
//     ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
//     ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
//     ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
//     ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
//     ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
//     ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
//     ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
//     ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
//     ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
//     ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
//     ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
//     ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
// ];
// $.DataTable = require("datatables.net")

// class Tbl extends Component {
//     state = {
//         showProfileDrp: false, data: dataSet
//     }

//     componentDidMount() {
//         console.log("el", this.el)
//         console.log("wunmi", dataSet)
//         this.$el = $(this.el);
//         this.$el.DataTable()
//         // {
//         //     // data: dataSet,
//         //     // columns: [
//         //     //     { title: "Name" },
//         //     //     { title: "Position" },
//         //     //     { title: "Office" },
//         //     //     { title: "Extn." },
//         //     //     { title: "Start date" },
//         //     //     { title: "Salary" }
//         //     // ]
//         // }

//     }

//     render() {
//         console.log("data", this.state)
//         const tableDt = this.state.data; console.log("tabledt", tableDt)
//         const tableList = tableDt.length ? (tableDt.map(data => {
//             console.log(data)
//             return (
//                 <tr>
//                     <td>{data[0]}</td>
//                     <td>{data[1]}</td>
//                     <td>{data[2]}</td>
//                     <td>{data[3]}</td>
//                     <td><button>hello</button></td>
//                     <td><button>yea</button></td>
//                 </tr>
//             )
//         })) : (
//                 <div>hhh</div>
//             )
//         return (
//             <Preloader>
//                 <Placeholder>
//                     <span fadeDuration={10000}>Loading...</span>
//                 </Placeholder>
//                 <div className="" >
//                     <table id="example" class="table table-striped table-bordered" width="100%" ref={el => this.el = el}>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Position</th>
//                                 <th>Office</th>
//                                 <th>Extn</th>
//                                 <th>Start date</th>
//                                 <th>Salary</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {tableList}
//                         </tbody>
//                     </table>
//                 </div>

//             </Preloader>
//         )

//     }


// }

// export default Tbl













import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import { connect } from "react-redux";
import { getNews } from "../store/actions/projectActions";
import '../style/datatable.css'
import swal from 'sweetalert';
import Moment from "react-moment";

const $ = require('jquery');
$.DataTable = require("datatables.net")

class ViewNews extends Component {

  state = { updates & trends: [], isLoading: false, isEdit: false }

  componentDidMount() {
    $("#example").DataTable();
    this.fetchData()
    let x = document.querySelectorAll("select")[0]; x.className = 'form-control';
  }

  fetchData = async () => {
    $("#example").DataTable();
    let _data = await this.props.getUpdates & trends()
    console.log("_data", _data)
    let { data } = _data.response;
    this.setState({ updates & trends: data.length ? data : null });
  }

  handleEdit = (e) => {
    // console.log(e)
    // console.log(e.target.id)
    // this.setState({ isEdit: true })
    // console.log("Got here", e.target)
    this.props.history.push(`/edit-updates & trends/${e.target.id}`)
  }

  handleDelete = (e) => {
    let isDev = /localhost/.test(window.location.origin);
    console.log("isdev", isDev)
    let base_url = isDev ? "http://localhost:4000/api" : "www.acadatrends.com/api"

    // console.log(e.target.id)
    let id = e.target.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to retrieve",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`${base_url}/updates & trends/${id}`, {
            method: "DELETE",
            headers: {
              'Content-type': "application/json"
            }
          }).then((res) => {
            res.json()
          }).then((data) => {
            // console.log("data", data)
            swal("File successfully deleted", {
              icon: "success"
            });
            this.props.history.push(`/view-Updates & trends/`)
          })

        }
      })
  }



  render() {
    if (this.state.isEdit) {

    }
    // console.log("render", this.state)
    const mydata = this.state.updates & trends;
    // console.log("tunde", mydata)
    // console.log(this.state.updates & trends)
    let newsList = mydata ? (
      mydata.map((o, i) => {
        // console.log("my data", o);
        return (
          <tr key={o._id}>
            <td>{i + 1}</td>
            <td>{o.author}</td>
            <td>{o.title}</td>
            <td>{o.content.slice(0, 300)}</td>
            <td><Moment fromNow>{o.createdAt}</Moment></td>
            <td><button className="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o._id}><i className="material-icons" id={o._id} style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
            <td><button className="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px", width: "10px" }} onClick={this.handleDelete} id={o._id}><i className="material-icons" id={o.id} style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
          </tr>
        )
      })
    ) : (
        <div>No data to show</div>
      )
    return (
      <Preloader>
        <Placeholder>
          <span fadeduration={10000}>Loading...</span>
        </Placeholder>
        <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
          <div className="card-body" style={{ background: "white" }}>
            <table id="example" className="table table-striped table-responsive  table-bordered table-hover" width="100%" >
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Date Created</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {newsList}
              </tbody>
            </table>
          </div>
        </div>
      </Preloader>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("Map props", state)
  const { projectMessage, projectData, status } = state.project;
  console.log("Scraa", projectMessage, projectData, status);
  return {
    projectMessage,
    projectData,
    status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUpdates & trends() {
      return new Promise(resolve => {
        dispatch(
          getUpdates & trends(res => {
            resolve(res);
          })
        );
      });
    }
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ViewUpdates & trends);
