import React, { Component, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './style/AdminPage.scss';
import Sender from './Sender';
import _ from "underscore";
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import Cookie from "js-cookie";
// import { Link } from 'react-router-dom';
import RadioButtonGroup from './subcomponent/RadioButtonGroup';
const clientUtil = require("./clientUtil");
// const { getBaseName } = clientUtil;
// const dateFormat = require('dateformat');
const AdminUtil = require("./AdminUtil");
import { GlobalContext } from './globalContext'
// const util = require("@common/util");
const classNames = require('classnames');
import {QRCodeSVG} from 'qrcode.react';

function MinifyZipQueSection(){
    const [minifyZipQue, setMinifyZipQue] = useState([]);

    useEffect(() => {
        Sender.post("/api/minifyZipQue", {}, res => {
            if (!res.isFailed()) {
                let { minifyZipQue } = res.json;
                setMinifyZipQue(minifyZipQue)
            }
        });
    }, []); 

    let items;
    if (minifyZipQue.length === 0) {
        items = "Empty Queue"
    } else {
        items = minifyZipQue.map(e => {
            return <div>{e} </div>
        });
    }

    return (
        <div className="admin-section">
            <div className="admin-section-title"> Zip Minify Queue</div>
            <div className="admin-section-content">
                {items}
            </div>
        </div>)
}

function cleanCache(minized) {
    Swal.fire({
        title: "Clean Cache",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value === true) {
            Sender.post('/api/cleanCache', {}, res => {
                // this.askCacheInfo()
            });
        }
    });
}

function CacheSection(){
    const [totalSize, setTotalSize] = useState(0);
    const [cacheNum, setCacheNum] = useState(0);
    const [thumbCount, setThumbCount] = useState(0);


    useEffect(() => {
        Sender.post("/api/cacheInfo", {}, res => {
            if (!res.isFailed()) {
                let { totalSize, cacheNum, thumbCount } = res.json;
                setTotalSize(totalSize);
                setCacheNum(cacheNum);
                setThumbCount(thumbCount);
            }
        });
    }, []); 

    const size = totalSize && clientUtil.filesizeUitl(totalSize);
    let cacheInfo;
    cacheInfo =(
        <div className="cache-info">
            <div className="cache-info-row"> {`thumbnail: ${thumbCount || 0}`} </div>
            <div className="cache-info-row">{`cache size: ${size}`} </div>
            <div className="cache-info-row">{`cache file number: ${cacheNum}`} </div>
        </div>);

    return (
        <div className="admin-section">
        <div className="admin-section-title" title="only keep thumbnail and delete other files"> Clean Cache</div>
        <div className="admin-section-content">
            {cacheInfo}
                {/* <div className="submit-button" onClick={cleanCache}>clean</div> */}
            </div>
        </div>
    )
}

function LogoutSection(){
    function dologout(){
        Sender.post("/api/logout", {}, res => {
            if (!res.isFailed()) {
                window.location.replace("/");
            }
        });
    }
 
    return (
        <div className="admin-section">
        <div className="admin-section-title" title="Logout"> Logout</div>
        <div className="admin-section-content">
            <a class="btn btn-info" onClick={dologout}>
            <span class="glyphicon glyphicon-log-out"></span> Log out
            </a>
        </div>
        </div>
    )
}

export default class AdminPage extends Component {
    constructor(prop) {
        super(prop);
        this.state = { prePath: null, dirs: [] };
    }

    componentDidMount() {
        this.requestHomePagePathes();
    }

    async requestHomePagePathes() {
        const res = await Sender.getWithPromise("/api/homePagePath");
        if (!res.isFailed()) {
            let { dirs } = res.json;
            this.setState({
                dirs: dirs || []
            })
        }
    }

    onPrenerate(fastUpdateMode) {
        const pathInput = ReactDOM.findDOMNode(this.pathInputRef);
        const path = pathInput.value || this.state.prePath;
        AdminUtil.askPregenerate(path, fastUpdateMode);
    }

    onPathChange(e) {
        this.setState({
            prePath: _.isString(e) ? e : e.target.value
        })
    }

    getPasswordInput() {
        const pathInput = ReactDOM.findDOMNode(this.passwordInputRef);
        const text = (pathInput && pathInput.value) || "";
        return text;
    }

    setPasswordCookie() {
        const text = this.getPasswordInput();
        Cookie.set("password", text, { expires: 3 });
        this.forceUpdate();
    }

    renderPasswordInput() {
        return null;

        let content;
        const { etc_config } = this.context;
        if (clientUtil.isAuthorized(etc_config)) {
            content = (<div className="admin-section-title"> You are authorized to move/delete files. </div>)
        } else {
            content = (<React.Fragment>
                <div className="admin-section-title">Enter password to move/delete file </div>
                <div className="admin-section-content">
                    <input className="admin-intput" ref={pathInput => this.passwordInputRef = pathInput}
                        placeholder="...type here" onChange={this.setPasswordCookie.bind(this)} />
                </div>
            </React.Fragment>);
        }

        return (
            <div className="admin-section">
                {content}
            </div>
        )
    }

    onclickShutDown() {
        Swal.fire({
            title: "Remote Shutdown",
            text: "Do you want to shut down your computer?",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value === true) {
                Sender.post('/api/shutdownServer', {}, res => {
                    //send another request  to check if shut down?
                    alert("You computer is shut down");
                });
            }
        });
    }

    renderRemoteShutDown() {
        // const { etc_config } = this.context;
        // if (clientUtil.isLocalHost() || !clientUtil.isAuthorized(etc_config)) {
        //     return;
        // }

        if(clientUtil.isLocalHost()){
            return;
        }

        return <button onClick={this.onclickShutDown.bind(this)}> Recomote shutdown </button>;
    }

    renderQRCode(){
        try{
            // https://www.npmjs.com/package/qrcode.react
            let data = sessionStorage.getItem('GeneralInfo');
            data = JSON.parse(data);
            if(data.server_ip){
                return (
                    <div className="admin-section">
                    <div className="admin-section-title" title="QR Code"> LAN Address</div>
                    <div className="admin-section-content">
                        <div style={{marginBottom: "5px"}}>{data.server_ip}</div>
                        <QRCodeSVG value={data.server_ip} />
                    </div>
                    </div>
                )
            }
        }catch(e){
            console.error(e);
        }
    }

    render() {
        document.title = "Admin"
        let folder_list = this.state.dirs.slice();
        folder_list.unshift("All_Pathes");

        return (
            <div className="admin-container container">
                {this.renderPasswordInput()}

                <div className="admin-section">
                    <div className="admin-section-title"> Pregenerate Thumbnail and Update Internal Database</div>
                    <div className="admin-section-content">
                        <RadioButtonGroup checked={folder_list.indexOf(this.state.prePath)}
                            options={folder_list} name="pregenerate" onChange={this.onPathChange.bind(this)} />
                        <input className="admin-intput" ref={pathInput => this.pathInputRef = pathInput} placeholder="...or any other path" />
                        <div className="submit-button" onClick={this.onPrenerate.bind(this)}>Full Update (Regenerate all data and thumbnail)</div>
                        <div className="submit-button" onClick={this.onPrenerate.bind(this, true)}>Fast Update (Only generate for new file)</div>
                    </div>
                </div>


                <CacheSection />
                {this.renderQRCode()}
                {this.renderRemoteShutDown()}
                <MinifyZipQueSection />
                <LogoutSection />

                <div className="author-link">
                    <a className="fab fa-github" title="Aji47's Github" href="https://github.com/hjyssg/ShiguReader" target="_blank"> Created By Aji47 </a>
                </div>
            </div>)

    }
}

AdminPage.contextType = GlobalContext;