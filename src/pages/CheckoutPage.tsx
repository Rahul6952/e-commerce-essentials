import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Smartphone, Wallet, Check, Loader2, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

type PaymentMethod = 'card' | 'upi' | 'wallet';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { items, total } = state;
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
    wallet: ''
  });

  const shipping = total > 100 ? 0 : 12;
  const finalTotal = total + shipping;

  if (items.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    } else if (paymentMethod === 'upi') {
      if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
    } else if (paymentMethod === 'wallet') {
      if (!formData.wallet) newErrors.wallet = 'Please select a wallet';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
    toast.success('Payment successful!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-20 text-center fade-in">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display text-3xl font-semibold mb-4">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order confirmation has been sent to {formData.email}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back button */}
        <Link
          to="/cart"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to cart</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Checkout Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-8 slide-up">
              {/* Contact */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Contact</h2>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`input-field ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className={`input-field ${errors.firstName ? 'border-destructive' : ''}`}
                    />
                    {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className={`input-field ${errors.lastName ? 'border-destructive' : ''}`}
                    />
                    {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className={`input-field mt-4 ${errors.address ? 'border-destructive' : ''}`}
                />
                {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className={`input-field ${errors.city ? 'border-destructive' : ''}`}
                    />
                    {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="ZIP code"
                      className={`input-field ${errors.zip ? 'border-destructive' : ''}`}
                    />
                    {errors.zip && <p className="text-destructive text-sm mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Payment Method</h2>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-medium">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                      paymentMethod === 'upi' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-xs font-medium">UPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                      paymentMethod === 'wallet' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                    <span className="text-xs font-medium">Wallet</span>
                  </button>
                </div>

                {/* Card Payment Fields */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 scale-in">
                    <div>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            cardNumber: formatCardNumber(e.target.value) 
                          }));
                          if (errors.cardNumber) {
                            setErrors(prev => ({ ...prev, cardNumber: '' }));
                          }
                        }}
                        placeholder="Card number"
                        className={`input-field ${errors.cardNumber ? 'border-destructive' : ''}`}
                        maxLength={19}
                      />
                      {errors.cardNumber && <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={`input-field ${errors.expiry ? 'border-destructive' : ''}`}
                          maxLength={5}
                        />
                        {errors.expiry && <p className="text-destructive text-sm mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="CVV"
                          className={`input-field ${errors.cvv ? 'border-destructive' : ''}`}
                          maxLength={4}
                        />
                        {errors.cvv && <p className="text-destructive text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Payment Fields */}
                {paymentMethod === 'upi' && (
                  <div className="scale-in">
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="Enter UPI ID (e.g., name@upi)"
                      className={`input-field ${errors.upiId ? 'border-destructive' : ''}`}
                    />
                    {errors.upiId && <p className="text-destructive text-sm mt-1">{errors.upiId}</p>}
                  </div>
                )}

                {/* Wallet Payment Fields */}
                {paymentMethod === 'wallet' && (
                  <div className="scale-in">
                    <select
                      name="wallet"
                      value={formData.wallet}
                      onChange={handleChange}
                      className={`input-field ${errors.wallet ? 'border-destructive' : ''}`}
                    >
                      <option value="">Select wallet</option>
                      <option value="paypal">PayPal</option>
                      <option value="applepay">Apple Pay</option>
                      <option value="googlepay">Google Pay</option>
                    </select>
                    {errors.wallet && <p className="text-destructive text-sm mt-1">{errors.wallet}</p>}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ${finalTotal.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Your payment information is encrypted and secure
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24 slide-up">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-secondary/30 rounded overflow-hidden relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-muted-foreground text-background text-xs font-medium rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <p className="text-sm font-medium self-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
