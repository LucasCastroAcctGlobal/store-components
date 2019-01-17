import React, { Fragment } from 'react'
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { path } from 'ramda'
import { orderFormConsumer, contextPropTypes } from 'vtex.store-resources/OrderFormContext'

import Loader from './Loader'

import styles from './styles.css'

const Wrapper = ({ children }) => (
  <div className={`${styles.container} mh4 pv4 t-heading-4 c-on-base nowrap`}>{children}</div>
)

const withWrapper = Component => props => (
  <Wrapper>
    <Component {...props} />
  </Wrapper>
)

const Greeting = ({ orderFormContext }) => {
  const firstName = path(['orderForm', 'clientProfileData', 'firstName'], orderFormContext)
  if (!firstName) return null

  return (
    <Wrapper>
      <Fragment>
        <span className={styles.message}>
          <FormattedMessage id="greeting" />,
        </span>
        <span className={`${styles.firstName} pl2 b`}>{firstName}</span>
      </Fragment>
    </Wrapper>
  )
}

Greeting.propTypes = { orderFormContext: contextPropTypes }

const enhanced = compose(
  orderFormConsumer,
  branch(({ loading }) => loading, renderComponent(withWrapper(Loader)))
)

export default enhanced(Greeting)
