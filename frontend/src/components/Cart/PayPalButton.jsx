import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{ 'client-id':'AegOcLD4rdylek0_4UChAWdQYdA199x9KPbwbGdHh3zPx7-dTUMxuVuEEtaY1h8yewqO1iGGdxJfYpXw' }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }]
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
      />

    </PayPalScriptProvider>
  )
}

export default PayPalButton
