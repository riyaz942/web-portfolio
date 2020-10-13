import React from 'react';
import Div from "Common/components/div";
import styles from './description_page.module.scss';
import reactBackgroundImage from "Images/technology/react-background-image.png";

const DescriptionPage = () => {
  return (
    <Div column align className={styles.page_container}>
      <img
        src={reactBackgroundImage}
        className={styles.image}
      />
      <div className={styles.description_container}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies, tortor ac maximus tempor, ipsum enim tempus arcu, quis dictum mi dolor ac nibh. Duis ut posuere libero. Donec tincidunt ut elit ultrices volutpat. Nullam at magna vel diam bibendum consectetur. Aenean sit amet risus eu dolor pellentesque aliquam a nec eros. Proin ac vulputate mauris. Vivamus non turpis congue, tincidunt lacus vitae, iaculis quam. Vestibulum sed pharetra lorem. Aenean non pharetra turpis, sit amet sollicitudin elit. Mauris ut porta dui. Praesent semper ultricies rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce enim quam, semper eu venenatis a, rutrum ut lacus. Quisque aliquet sagittis tristique. Aenean et sapien ac metus tempus pretium.</p>
        <p>Donec faucibus sagittis elit vel interdum. Etiam eu augue laoreet, fringilla risus ut, bibendum mauris. Ut congue pulvinar elementum. Fusce dolor tortor, laoreet et ante eget, bibendum posuere lectus. Quisque vitae ullamcorper urna. Quisque auctor at nisl at tincidunt. Ut nec tempor diam, non feugiat ipsum. Maecenas iaculis sapien facilisis quam elementum lobortis. Nullam sit amet eros accumsan, ultricies enim sed, varius urna. Suspendisse in lobortis magna. Aliquam erat volutpat. Phasellus augue libero, venenatis at eros nec, lacinia viverra leo. Ut auctor massa vel blandit vestibulum.</p>
        <p>Pellentesque eros elit, ornare eu consequat ac, pharetra et tortor. Nullam efficitur nisi sed consequat efficitur. Praesent malesuada, enim vitae mollis porttitor, turpis lectus tincidunt sapien, eu condimentum dui tellus rutrum urna. Mauris ullamcorper massa risus, vel rutrum risus maximus sit amet. Cras condimentum nibh id ligula convallis vehicula. Nam vehicula facilisis dui a vehicula. Mauris porta sed nibh non cursus. In auctor id orci sed euismod. Vestibulum libero quam, faucibus eu feugiat vitae, convallis a tellus. Nulla venenatis eget quam at sagittis. Maecenas lacus enim, luctus sed facilisis fermentum, aliquam sit amet mi. Nullam scelerisque condimentum fringilla. Mauris rutrum enim orci, nec vestibulum ex sollicitudin in. Cras vestibulum facilisis magna, et ullamcorper ex molestie vel. Aenean felis felis, vehicula vitae eleifend a, laoreet at sapien.</p>
        <p>Duis fermentum id augue ac congue. Curabitur diam orci, auctor non leo a, euismod lobortis velit. Vivamus sodales nulla a diam tempor mattis. Suspendisse sit amet egestas velit. Vivamus sit amet metus tellus. Fusce blandit lectus vitae enim posuere, ac tristique dui maximus. Nullam rhoncus elementum mi. Nulla tempor felis ut metus scelerisque, ut porttitor odio pretium. Cras porttitor vestibulum nisi. Maecenas eu lacus posuere arcu euismod cursus.</p>
      </div>
    </Div>
  )
}
 
export default DescriptionPage;
