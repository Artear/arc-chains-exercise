// /* React */
// import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";

// /* Fusion */
// import Consumer from "fusion:consumer";

// /* Components */
// import bodyElements from "./_children/_bodyElements";

// @Consumer
// class ArticleBodyAMP extends Component {
//   render() {
//     const { content_elements: contentElements } = this.props.globalContent;

//     return (
//       <Fragment>
//         {contentElements && (
//           <section className={this.props.classes}>
//             {contentElements.map(element => {
//               return bodyElements(element, "amp", this.props);
//             })}
//           </section>
//         )}
//       </Fragment>
//     );
//   }
// }

// ArticleBodyAMP.propTypes = {
//   classes: PropTypes.string,
//   globalContent: PropTypes.object
// };

// export default ArticleBodyAMP;
