function OrderPage() {
  return (
    <main className="order-page">
      <section className="order-intro container">
        <h2>Request Your Rental</h2>
        <p>
          Fill out the form below to book your kayak or paddleboard. We’ll confirm availability
          and contact you with pickup details. Adventure starts with one click!
        </p>
      </section>

      <section className="order-form-section container">
        <h2>Customer Information</h2>

        <form className="order-form">
          <div className="form-group">
            <label htmlFor="fullname">Full Name *</label>
            <input id="fullname" name="fullname" type="text" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input id="phone" name="phone" type="tel" required placeholder="+358 40 123 4567" />
          </div>

          <fieldset className="form-fieldset">
            <legend>Rental Details</legend>

            <div className="form-group">
              <label htmlFor="item">Item to Rent *</label>
              <select id="item" name="item" required>
                <option value="">Select an item…</option>
                <option>Solo Kayak</option>
                <option>Tandem Kayak</option>
                <option>Stand-Up Paddle Board</option>
                <option>Pro Touring Kayak</option>
                <option>Kids Kayak</option>
                <option>Life Jackets</option>
              </select>
            </div>

            <div className="date-grid">
              <div className="form-group">
                <label htmlFor="start">Start Date *</label>
                <input id="start" name="start" type="date" required />
              </div>

              <div className="form-group">
                <label htmlFor="end">End Date *</label>
                <input id="end" name="end" type="date" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="qty">Quantity *</label>
              <input id="qty" name="qty" type="number" min="1" max="10" required />
            </div>
          </fieldset>

          <div className="form-group">
            <label htmlFor="msg">Additional Information</label>
            <textarea
              id="msg"
              name="message"
              rows="4"
              placeholder="Special requests, notes, or preferences…"
            ></textarea>
          </div>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" required /> I accept the rental terms and privacy policy *
            </label>

            <label>
              <input type="checkbox" /> Subscribe to newsletter (optional)
            </label>
          </div>

          <button type="submit" className="submit-button">
            Submit Rental Request
          </button>
        </form>
      </section>
    </main>
  )
}

export default OrderPage