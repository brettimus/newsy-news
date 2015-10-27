var React = require("react");
var ReactDOM = require("react-dom");
var moment = require("moment");

var ItemShow = React.createClass({
    render: function() {
        // nyi
    },
});


var CommentButton = React.createClass({
    render: function() {
        return (
            <a className="item-action"
                data-swipe-target="comment" data-swipe-direction="left">
                <i className="fa fa-comment item-action-icon"></i> 
                <span className="item-action-microcopy">
                    Comment                                   
                </span>
            </a>
        );
    },
});

var ShareButton = React.createClass({
    render: function() {
        return (
            <a className="item-action"
                data-swipe-target="share" data-swipe-direction="right">
                <i className="fa fa-share-alt item-action-icon"></i>
                <span className="item-action-microcopy">
                    Share                                    
                </span>
            </a>
        );
    },
});

var BackButton = React.createClass({
    render: function() {
        return (
            <a className="item-action"
                data-swipe-target="item" data-swipe-direction="center">
                <i className={"fa fa-arrow-" + this.props.arrowDirection + " item-action-icon"}></i> 
                <span className="item-action-microcopy">
                    Back                                    
                </span>
            </a>
        );
    },
});

var ItemReadingNav = React.createClass({
    render: function() {
        return (
            <footer className="item-footer item-action-container">
                <CommentButton/>
                <ShareButton/>
            </footer>
        );
    },
});

var ItemReadingMode = React.createClass({
    render: function() {
        var data      = this.props.itemData,
            title     = data.title,
            url       = data.url,
            timestamp = data.timestamp,
            author    = data.author;

        return (
            <section className="item-body item-body-center" data-swipe-name="item">
                <a className="item-title" href="#">
                    <h3 className="item-title-heading">
                        {title}
                        <span className="item-meta item-meta-url">
                            {url}
                        </span>
                    </h3>                        
                </a>
                <time dateTime={timestamp} className="item-meta item-meta-timestamp">
                    {moment(timestamp).fromNow()}
                </time> 
                <a href="#" rel="author" className="item-meta item-meta-author">
                    {author}
                </a>
                <ItemReadingNav/>
            </section>
        );
    },
});

var ItemCommentComposingMode = React.createClass({
    render: function () {
        return (
            <section className="item-body item-body-left" data-swipe-name="comment">
                <h3 className="item-title-heading">
                    Be thoughtful.
                    <span className="item-title-subheading">
                        We dont take kind to flame wars ’round here.
                    </span>
                </h3>                        

                <footer className="item-footer item-action-container">
                    <BackButton arrowDirection="right" />
                </footer>
            </section>
        );
    }
});

var ItemSharingMode = React.createClass({
    render: function () {
        return (
            <section className="item-body item-body-right" data-swipe-name="share">
                <h3 className="item-title-heading">
                    Sharing is caring.
                    <span className="item-title-subheading">
                        Let the world know that you saw this.
                    </span>
                </h3>   

                <footer className="item-footer item-action-container">
                    <CommentButton/>
                    <BackButton arrowDirection="left" />
                </footer>
            </section>
        );
    }
})

var ItemShow = React.createClass({
    render: function() {
        return (
            <div className="item-main">
                <ItemReadingMode itemData={this.props.itemData}/>
                <ItemCommentComposingMode/>
                <ItemSharingMode/>
            </div>
        );
    }
});

var ItemVote = React.createClass({
    render: function() {
        var upvotedClassName = this.props.upvoted ? "item-upvote--upvoted" : ""; // defined in stylesheet
        return (
            <section className={"item-upvote " + upvotedClassName} onClick={this.props.onVote}>
                <i className="fa fa-arrow-circle-up fa-fw"></i>
            </section>
        );
    }
});

var Item = React.createClass({
    getInitialState() {
        return {
            mode: "reading",
            upvoted: this.props.itemData.upvoted,  
        };
    },

    toggleVote(e) {
        this.setState({
            upvoted: !this.state.upvoted,
        });
        e.preventDefault();
    },

    render () {
        return (
            <article className="item item-news">
                <ItemVote upvoted={this.state.upvoted} onVote={this.toggleVote} />
                <ItemShow itemData={this.props.itemData}/>
            </article>
        );
    }
});

var ItemList = React.createClass({

    render: function() {
        var items = this.props.itemData.map(function(item) {
            return (
                <Item key={item.id} itemData={item} />
            );
        });
        return (
            <main className="feed">
                {items}
            </main>
        );
    },
});

var ItemListFilter = React.createClass({
    handleChange(e) {
        var value = e.target.value;
        this.props.onFilterChange(value);
        // e.preventDefault();
    },

    isChecked(value) {
        return this.props.sortBy === value;
    },

    render() {
        return (
        <form>
            <fieldset>
                <input type="radio" name="itemListFilter" value="popular" 
                    onChange={this.handleChange} checked={this.isChecked("popular")}/> Most Popular
                <input type="radio" name="itemListFilter" value="recent"
                    onChange={this.handleChange} checked={this.isChecked("recent")}/> Most Recent
            </fieldset>
        </form>
        );
    },
});

var ItemFeed = React.createClass({
    getInitialState() {
        return {
            itemData: [],
            sortBy: "popular",
        };
    },

    componentDidMount() {
        this.getItems();
    },

    getItems() {
        // TODO
        // * this is our fake ajax call. our fajax if you will.
        // * this should check if we already have the data (OR SHOULD IT???)
        // * we should pass the sortBy in our ajax request

        var sortBy = this.state.sortBy;

        setTimeout(() => {
            // AJAX(URL + sortBy);
            this.setState({
                itemData: require("./fake-data").items.reverse(),
            })
        }, 100);  
    },

    handleFilterChange(sortBy) {
        if (sortBy === this.state.sortBy) return;
        
        this.setState({
            sortBy: sortBy,
        });

        this.getItems();
    },

    componentDidUpdate(prevProps, prevState) {
        // has sortBy changed?

    },

    render() {
        return (
            <div>
                <ItemListFilter sortBy={this.state.sortBy} onFilterChange={this.handleFilterChange}/>
                <ItemList itemData={this.state.itemData}/>
            </div>
        );
    }
});

module.exports = ItemFeed;
