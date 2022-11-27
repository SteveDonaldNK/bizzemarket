import React, { Component } from "react";

class GoogleAds extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
    }

    render () {
        return(
            <div>
                <ins class="adsbygoogle"
                    style={{display: "block"}}
                    data-ad-client="ca-pub-4333455889282958"
                    data-ad-slot="8955753764"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        )
    }
}

export default GoogleAds;