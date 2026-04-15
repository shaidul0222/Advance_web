import { useState } from 'react'

function OrderPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    item: '',
    start: '',
    end: '',
    qty: 1,
    message: '',
    termsAccepted: false,
    newsletter: false,
  })

  const [errors, setErrors] = useState({})
  const [responseData, setResponseData] = useState(null)
  const [submitStatus, setSubmitStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    }

    if (!formData.item) {
      newErrors.item = 'Please select an item.'
    }

    if (!formData.start) {
      newErrors.start = 'Start date is required.'
    }

    if (formData.start && formData.start < today) {
      newErrors.start = 'Start date cannot be in the past.'
    }

    if (!formData.end) {
      newErrors.end = 'End date is required.'
    }

    if (formData.start && formData.end && formData.end < formData.start) {
      newErrors.end = 'End date cannot be before start date.'
    }

    if (!formData.qty || Number(formData.qty) < 1 || Number(formData.qty) > 10) {
      newErrors.qty = 'Quantity must be between 1 and 10.'
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the rental terms and privacy policy.'
    }

    return newErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus('Please fix the errors before submitting.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('Submitting...')
    setResponseData(null)

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed.')
      }

      const data = await response.json()

      setResponseData(data.json)
      setSubmitStatus('Form submitted successfully!')
      setErrors({})
    } catch (error) {
      setSubmitStatus('Something went wrong while sending the form.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name *</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            {errors.fullname && <p className="form-error">{errors.fullname}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+358 40 123 4567"
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <fieldset className="form-fieldset">
            <legend>Rental Details</legend>

            <div className="form-group">
              <label htmlFor="item">Item to Rent *</label>
              <select
                id="item"
                name="item"
                value={formData.item}
                onChange={handleChange}
                required
              >
                <option value="">Select an item…</option>
                <option value="Solo Kayak">Solo Kayak</option>
                <option value="Tandem Kayak">Tandem Kayak</option>
                <option value="Stand-Up Paddle Board">Stand-Up Paddle Board</option>
                <option value="Pro Touring Kayak">Pro Touring Kayak</option>
                <option value="Kids Kayak">Kids Kayak</option>
                <option value="Life Jackets">Life Jackets</option>
              </select>
              {errors.item && <p className="form-error">{errors.item}</p>}
            </div>

            <div className="date-grid">
              <div className="form-group">
                <label htmlFor="start">Start Date *</label>
                <input
                  id="start"
                  name="start"
                  type="date"
                  value={formData.start}
                  onChange={handleChange}
                  min={today}
                  required
                />
                {errors.start && <p className="form-error">{errors.start}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="end">End Date *</label>
                <input
                  id="end"
                  name="end"
                  type="date"
                  value={formData.end}
                  onChange={handleChange}
                  min={formData.start || today}
                  required
                />
                {errors.end && <p className="form-error">{errors.end}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="qty">Quantity *</label>
              <input
                id="qty"
                name="qty"
                type="number"
                min="1"
                max="10"
                value={formData.qty}
                onChange={handleChange}
                required
              />
              {errors.qty && <p className="form-error">{errors.qty}</p>}
            </div>
          </fieldset>

          <div className="form-group">
            <label htmlFor="msg">Additional Information</label>
            <textarea
              id="msg"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Special requests, notes, or preferences…"
            ></textarea>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />{' '}
              I accept the rental terms and privacy policy *
            </label>
            {errors.termsAccepted && <p className="form-error">{errors.termsAccepted}</p>}

            <label>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />{' '}
              Subscribe to newsletter (optional)
            </label>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Rental Request'}
          </button>
        </form>

        {submitStatus && <p className="submit-status">{submitStatus}</p>}

        {responseData && (
          <section className="response-box">
            <h3>Server Response</h3>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </section>
        )}
      </section>
    </main>
  )
}

export default OrderPage