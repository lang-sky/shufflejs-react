// const React = window.React;
// const ReactDOM = window.ReactDOM;
// const Component = React.Component;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shuffle from 'shufflejs';
import SortButtons from './SortButtons';
import Search from './Search';
// import SelectBoxes from './SelectBoxes';

// const Shuffle = window.Shuffle;
// const { Shuffle } = window;

class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // taxonomies: {},
      taxonomiesBodyTypeNames: []
    };
    this.element = React.createRef();
    this.sizer = React.createRef();
  }

  UNSAFE_componentWillMount() {
    /**
     * Kick off the network request and update the state once it returns.
     */
    // console.log('this.props.taxonomies',this.props.taxonomies)
    const { taxonomies } = this.props;
    this._loadProps()
      .then((props) => {
        this.setState({
          // taxonomies,
          taxonomiesBodyTypeNames: Object.keys(taxonomies['Body Types'])
        });
        this.shuffle.filter(props.defaultSort);
      });
  }

  componentDidMount() {
    // let options = {
    //   // reverse: true,
    //   by: this._byFunction
    // }
    const { itemSelector } = this.props;
    this.shuffle = new Shuffle(this.element.current, {
      // itemSelector: '.sortblock',
      itemSelector: `.${itemSelector}`,
      sizer: this.sizer.current,
      // initialSort: options
    });
  }

  componentDidUpdate() {
    // Notify shuffle to dump the elements it's currently holding and consider
    // all elements matching the `itemSelector` as new.
    this.shuffle.resetItems();
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  }

  _byFunction = (element) => {
    const { defaultSort } = this.props;
    const dataGroups = element.getAttribute('data-groups');// array string
    const dataArray = JSON.parse(dataGroups);// array
    // const defaultValue = dataArray.find((value) => {return value === this.props.defaultSort;});
    const defaultValue = dataArray.find((value) => value === defaultSort);
    // console.log('defaultValuess',defaultValue)
    return defaultValue;
  }


  /**
   * Search handlers via shufflejs filter
   * Get search text from input value
   * Use shufflejs filter function to filters by name
   * @param {Object} evt is the event element object to get target information
   * @return {boolean} - if true it will sort
   */
  handleSearchKeyup = (evt) => {
    const searchText = evt.target.value.toLowerCase();

    function filterCallback(element) {
      // console.log('filter element: ', element);
      const titleElement = element.querySelector('.sortblock__title');
      const titleText = titleElement.textContent.toLowerCase().trim();
      // var t = titleText.indexOf(searchText);
      // var f = titleText.indexOf(searchText) !== -1;
      // console.log('titleElement: ', titleElement);
      // console.log('titleText: ', titleText);
      // console.log('t: ', t);
      // console.log('f: ', f);

      return titleText.indexOf(searchText) !== -1;
    }

    this.shuffle.filter(filterCallback);

    // this.shuffle.filter(function (element, shuffle) {
    //   // console.log('filter element: ', element);
    //   var titleElement = element.querySelector('.sortblock__title');
    //   var titleText = titleElement.textContent.toLowerCase().trim();
    //   // var t = titleText.indexOf(searchText);
    //   // var f = titleText.indexOf(searchText) !== -1;
    //   // console.log('titleElement: ', titleElement);
    //   // console.log('titleText: ', titleText);
    //   // console.log('t: ', t);
    //   // console.log('f: ', f);

    //   return titleText.indexOf(searchText) !== -1;
    // });
  };

  /**
   * Sort by the text node within the targeted element
   * @param {Object} e to the event target of the element
   */
  sortByName = (e) => {
    e.preventDefault();
    this.shuffle.filter(e.target.textContent);
  }

  /**
   * Sort by the specific text
   * @param {string} text
   */
  sortByText = (text) => {
    this.shuffle.filter(text);
  }

  /**
   * Show all elements using shufflejs provided string
   * @param {Object} e to the event target of the element
   */
  sortAll = (e) => {
    e.preventDefault();
    this.shuffle.filter(Shuffle.ALL_ITEMS);
  }

  /**
   * Specific for the PageLoading Component demo
   * makes the button link hide/display text
   */
  toggleSlide = () => {
    // console.log('ggggg', this.slider);
    this.slider.classList.toggle('slider-closed');
  }

  /**
   * Set delay
   * @return {Promise<Object[]>} A promise which resolves with an array of objects.
   */
  _loadProps() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.props);
      }, 500);
    });
  }

  render() {
    const { taxonomiesBodyTypeNames } = this.state;
    const { children, itemSelector } = this.props;
    return (
      <div className="sort-mainblock">
        <div className="sort-mainblock__sorting">
          <div className="row">
            <Search onKeyUp={this.handleSearchKeyup} />
            <SortButtons onClickByName={this.sortByName} onClickAll={this.sortAll} taxonomies={taxonomiesBodyTypeNames} allTrue sortAllText="All" />
            {/* <SelectBoxes onClickByName={this.sortByText} taxonomies={taxonomies} /> */}
          </div>
        </div>
        <div ref={this.element} className="row" classtosort={itemSelector}>
          {children}
          <div ref={this.sizer} className="col-sm-1 col-1@xs col-1@sm sort-mainblock__sizer" />
        </div>
      </div>
    );
  }
}

export default Core;

Core.propTypes = {
  defaultSort: PropTypes.string.isRequired,
  // taxonomies: PropTypes.arrayOf(PropTypes.object).isRequired,
  taxonomies: PropTypes.objectOf(PropTypes.object).isRequired,
  itemSelector: PropTypes.string.isRequired,
  // children: PropTypes.element.isRequired
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired
};
