import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
// import '../style/datatable.css'
const $ = require('jquery');
$.DataTable = require("datatables.net")

class Table extends Component {

    state = { updates & trends: [], isLoading: false }

    componentDidMount() {


        fetch(`http://localhost:4000/updates & trends/`).then((response) => {
            return response.json()
        }).then((updates & trendsData) => {
            console.log("yes", updates & trendsData.data)
            this.setState({ updates & trends: updates & trendsData.data.length ? updates & trendsData.data : null })
        })
        $('#example').DataTable();


    }

    render() {


        return (
            <Preloader>
                <Placeholder>
                    <span fadeDuration={10000}>Loading...</span>
                </Placeholder>
                <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
                    <table id="example" class="display" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>
                                <td>Edinburgh</td>
                                <td>61</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>Garrett Winters</td>
                                <td>Accountant</td>
                                <td>Tokyo</td>
                                <td>63</td>
                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>


                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Preloader>
        )
    }
}


export default Table
