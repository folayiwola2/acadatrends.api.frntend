import React, { Component } from 'react'
import { getNews } from "../components/store/actions/projectActions";
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';

class Scroll extends Component {

    state = { news: [], isLoading: false, isEdit: false }
    componentDidMount() {
        this.fetchData()

    }


    fetchData = async (page) => {
        fetch(`http://localhost:4000/api/news?pageNo=${page}&size=20`).then(res => {
            res.json()
        }).then(data => {
            console.log(data)
        })
    }

    render() {
        let { news } = this.state;
        let items = news && news.map((res, i) => {
            return (
                <div>i</div>
            )
        })
        return (
            <div style={{
                height: "700px", overFlow: "auto"
            }} >
                <InfiniteScroll
                    pageStart={1}
                    loadMore={this.fetchData}
                    hasMore={true || false}
                    loader={<div className="" key={0}>Loading ...</div>}
                    useWindow={false}
                >
                    {items}
                </InfiniteScroll>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("Map props", state)
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
        getNews() {
            return new Promise(resolve => {
                dispatch(
                    getNews(res => {
                        resolve(res)

                    })
                );
            });
        }
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(Scroll);