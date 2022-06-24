import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  //default payment method
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Metodă de plată</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Selectează metoda de plată</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Card de credit sau PayPal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check><i class="fa-brands fa-cc-paypal"></i>
             <Form.Check
              type='radio'
              label='Ramburs'
              id='Ramburs'
              name='paymentMethod'
              value='Ramburs'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> <i class="fa-solid fa-euro-sign"></i>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continuă
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
