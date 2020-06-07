import React, { Component } from 'react';
import styles from './project_details_page.module.scss';
import Div from "Common/components/div";

export default class NewProjectDetailsPage extends Component {
  render() {
     return (
       <Div align column className={styles.container}>
         <div className={styles.content}>
           Something
         </div>
       </Div>
     )
  }
}