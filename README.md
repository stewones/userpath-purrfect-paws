# Purrfect Paws - UserPath Analytics Demo

A realistic e-commerce application for cat adoption showcasing UserPath analytics integration. This demo features a complete kitty adoption experience with comprehensive tracking of user behavior, e-commerce events, and conversion funnels.

## About This Demo

**Purrfect Paws** is a fictional cat adoption website that demonstrates real-world UserPath analytics implementation. The application includes realistic features like product browsing, shopping cart, checkout flow, and customer interactions - everything except actual payment processing.

## UserPath Integration

This application integrates [UserPath](https://userpath.co), an AI-powered analytics platform, using the JavaScript SDK for comprehensive e-commerce tracking and semantic HTML attributes for automatic tracking.

### Configuration

- **Integration Method**: JavaScript SDK (Browser Pixel available as alternative)
- **App ID**: Configured via `NEXT_PUBLIC_USERPATH_APP_ID` environment variable
- **Auto-tracking**: Enabled for all event types (clicks, scrolls, forms, errors, performance)
- **Semantic HTML**: Uses data attributes for enhanced automatic tracking
- **Custom Events**: Only for essential business events (e-commerce, conversions)

#### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_USERPATH_APP_ID` | Your UserPath application ID | Yes |
| `NEXT_PUBLIC_USERPATH_SERVER_URL` | Custom server URL (optional) | No |

## 🎯 Best Practices & Guidelines

### ✅ DO: Leverage Automatic Tracking

UserPath automatically tracks 20+ user interactions out of the box. **Let UserPath do the heavy lifting:**

```typescript
// ✅ DO: UserPath automatically tracks these - no custom code needed
- Page views and navigation
- Button and link clicks  
- Scroll depth milestones
- Form interactions and submissions
- Video play/pause/complete events
- JavaScript errors and performance metrics
- Core Web Vitals (LCP, FID, CLS)
- User activity and inactivity
```

#### Use Semantic HTML Attributes for Context

```tsx
// ✅ DO: Add semantic attributes for richer automatic tracking
<button 
  className="checkout-btn"
  data-action="checkout"
  data-items-count={items.length}
  data-total-value={totalPrice}
>
  Start Adoption Process
</button>

<section data-section="product-catalog">
  <div data-filter="breed" />
  <div data-filter="age" />
</section>

<form data-form="contact">
  <input data-field="email" />
  <input data-field="name" />
</form>
```

### ❌ DON'T: Create Custom Events for Basic Interactions

```typescript
// ❌ DON'T: UserPath tracks these automatically
trackEvent('button_clicked', { button_id: 'checkout' });
trackEvent('page_scrolled', { scroll_depth: '50%' });
trackEvent('form_field_focused', { field_name: 'email' });
trackEvent('video_played', { video_id: 'demo' });

// ❌ DON'T: Duplicate automatic tracking
useEffect(() => {
  const handleScroll = () => {
    trackEvent('scroll_milestone', { percentage: getScrollPercentage() });
  };
  window.addEventListener('scroll', handleScroll);
}, []);
```

### ✅ DO: Use Custom Events for Business-Critical Actions

```typescript
// ✅ DO: Track essential e-commerce events
const { trackEvent } = useUserPath();

// E-commerce conversions
trackEvent('add_to_cart', {
  product_id: cat.id,
  product_name: cat.name,
  product_price: cat.price,
  cart_size: items.length + 1
});

// Business milestones
trackEvent('adoption_inquiry_submitted', {
  cat_id: selectedCat.id,
  inquiry_type: 'adoption',
  user_type: 'first_time_visitor'
});

// Feature usage
trackEvent('advanced_filter_used', {
  filter_type: 'personality_traits',
  traits_selected: selectedTraits,
  results_count: filteredResults.length
});
```

### 🎯 Essential Events to Track

#### E-commerce & Conversions
```typescript
// Core e-commerce funnel
'add_to_cart'           // Product added to cart
'remove_from_cart'      // Product removed from cart  
'checkout_initiated'    // Checkout process started
'purchase_completed'    // Transaction completed
'lead_generated'        // Contact form, inquiry submitted
```

#### Business-Specific Actions
```typescript
// SaaS/Product specific
'feature_discovered'    // User finds new feature
'trial_started'        // Free trial begins
'subscription_upgraded' // Plan upgrade
'user_onboarded'       // Onboarding completed

// Content & Engagement
'content_shared'       // Social sharing
'newsletter_subscribed'// Email signup
'download_completed'   // File/resource downloaded
```

### 🚫 Avoid These Common Mistakes

#### 1. Over-tracking Basic Interactions
```typescript
// ❌ DON'T: These are automatically tracked
trackEvent('link_clicked');
trackEvent('page_viewed');
trackEvent('scroll_started');
trackEvent('form_focused');
```

#### 2. Tracking Non-Essential Actions
```typescript
// ❌ DON'T: These rarely provide business value
trackEvent('mouse_moved');
trackEvent('page_resized');
trackEvent('tab_switched');
trackEvent('keyboard_pressed');
```

#### 3. Creating Redundant Events
```typescript
// ❌ DON'T: UserPath's automatic click tracking already captures this
<button onClick={() => trackEvent('cta_clicked')}>
  Get Started
</button>

// ✅ DO: Use semantic attributes instead
<button data-cta="get-started" data-action="primary">
  Get Started  
</button>
```

### 📊 Semantic HTML Data Attributes Guide

Use these data attributes to enhance UserPath's automatic tracking:

#### Action Identification
```html
<!-- Buttons and CTAs -->
<button data-action="purchase">Buy Now</button>
<button data-action="add-to-cart">Add to Cart</button>
<button data-action="signup">Sign Up</button>

<!-- Navigation and Links -->
<a data-action="download" data-file-type="pdf">Download Guide</a>
<a data-nav="pricing" href="/pricing">Pricing</a>
```

#### Content Sections
```html
<!-- Page sections -->
<section data-section="hero">...</section>
<section data-section="features">...</section>
<section data-section="testimonials">...</section>

<!-- Content types -->
<article data-content-type="blog-post">...</article>
<div data-content-type="product-card">...</div>
```

#### Form Elements
```html
<!-- Forms and inputs -->
<form data-form="signup">
  <input data-field="email" type="email" />
  <input data-field="password" type="password" />
  <button data-action="submit-form">Submit</button>
</form>
```

#### E-commerce Elements
```html
<!-- Product interactions -->
<div data-product-id="cat-123" data-product-name="Fluffy">
  <button data-action="quick-add">Quick Add</button>
  <button data-action="view-details">View Details</button>
</div>

<!-- Cart elements -->
<div data-cart-item="cat-123">
  <select data-action="update-quantity">...</select>
  <button data-action="remove-item">Remove</button>
</div>
```

### 🎛️ Configuration Best Practices

#### UserPath SDK Setup
```typescript
// ✅ DO: Enable all automatic tracking
const up = new UserPath({
  appId: process.env.NEXT_PUBLIC_USERPATH_APP_ID!,
  autoTrack: {
    errors: true,          // JavaScript errors
    clicks: true,          // All click interactions  
    scrolling: true,       // Scroll depth tracking
    forms: true,           // Form interactions
    videos: true,          // Video engagement
    pageVisibility: true,  // Tab switching, page focus
    pageInactivity: true,  // User activity detection
    performance: true      // Core Web Vitals
  }
});

// ❌ DON'T: Disable automatic tracking unless absolutely necessary
const up = new UserPath({
  appId: 'your-app-id',
  autoTrack: false  // Loses 90% of UserPath's value
});
```

#### Custom Event Structure
```typescript
// ✅ DO: Use consistent, descriptive event names (snake_case)
trackEvent('subscription_upgraded', {
  old_plan: 'free',
  new_plan: 'premium', 
  upgrade_source: 'billing_page',
  monthly_price: 29.99
});

// ❌ DON'T: Use vague or inconsistent naming
trackEvent('buttonClick', { btn: 'upgrade', src: 'billing' });
trackEvent('user-did-something', { what: 'upgraded' });
```

### 🔄 Event Property Guidelines

#### Keep Properties Meaningful
```typescript
// ✅ DO: Include context that helps understand user behavior
trackEvent('product_filtered', {
  filter_type: 'breed',
  filter_value: 'persian',
  results_count: 12,
  previous_results_count: 45,
  search_session_id: sessionId
});

// ❌ DON'T: Include redundant or obvious properties
trackEvent('product_filtered', {
  event_type: 'filter',  // Already in event name
  timestamp: Date.now(), // UserPath adds automatically
  page_url: window.location.href // UserPath tracks automatically
});
```

#### Limit Property Count
```typescript
// ✅ DO: Keep under 10 properties per event
trackEvent('cart_updated', {
  action: 'add',
  product_id: 'cat-123',
  quantity: 1,
  cart_total: 149.99,
  cart_items_count: 3
});

// ❌ DON'T: Create events with excessive properties
trackEvent('user_action', {
  // 20+ properties make events hard to analyze
  prop1: 'value1', prop2: 'value2', /* ... */ prop20: 'value20'
});
```

### 🔧 Server-Side Tracking

#### Essential Server Events Only
```typescript
// ✅ DO: Track server-only business events
app.post('/api/purchase', async (req, res) => {
  const sessionId = req.cookies['_up.sid'];
  
  // Track successful purchase completion
  up.track('purchase', {
    sid: sessionId,
    price: orderTotal,
    currency: 'USD',
    properties: {
      order_id: order.id,
      payment_method: 'stripe',
      customer_type: customer.isReturning ? 'returning' : 'new'
    }
  });
});

// ❌ DON'T: Duplicate client-side events on server
app.post('/api/page-view', async (req, res) => {
  // UserPath already tracks page views automatically
  up.track('page_view', { url: req.body.url });
});
```

### 📈 Performance Considerations

#### Non-Blocking Tracking
```typescript
// ✅ DO: Make tracking non-blocking
(async () => {
  try {
    await trackEvent('feature_used', { feature: 'search' });
  } catch (error) {
    console.error('Tracking error:', error);
    // Don't block user experience for tracking failures
  }
})();

// ❌ DON'T: Block user actions for tracking
const handleSubmit = async () => {
  await trackEvent('form_submitted'); // Blocks form submission
  submitForm();
};
```

#### Efficient Event Batching
```typescript
// ✅ DO: Let UserPath batch events automatically
trackEvent('step_1_completed');
trackEvent('step_2_started');
trackEvent('step_2_completed');

// ❌ DON'T: Try to manually batch events
const events = [];
events.push({ name: 'step_1_completed' });
events.push({ name: 'step_2_started' });
// Manual batching adds complexity without benefit
```

### 🎯 Implementation Quick Start

1. **Install UserPath**: Add the SDK to your project
2. **Enable Auto-tracking**: Let UserPath track 20+ events automatically  
3. **Add Semantic HTML**: Use data attributes for enhanced context
4. **Track Business Events**: Only add custom events for business-critical actions
5. **Monitor & Optimize**: Use UserPath's AI to analyze and improve

### 📚 Resources

- [UserPath Documentation](https://userpath.co/docs)
- [Automatic Event Tracking Guide](https://userpath.co/docs/track-events#automatic-event-tracking)
- [Custom Event Best Practices](https://userpath.co/docs/track-events#custom-event-tracking)
- [Semantic HTML Guide](https://userpath.co/docs/track-events#click-events)

---

### Features Implemented

#### 1. Automatic Event Tracking
UserPath automatically tracks the following events across all pages:
- ✅ Page views and navigation between sections
- ✅ Click interactions on buttons, links, and interactive elements
- ✅ Scroll depth milestones and engagement metrics
- ✅ Form field focus, interactions, and submissions
- ✅ JavaScript errors and performance metrics
- ✅ Core Web Vitals (LCP, FID, CLS, INP)

and more. See the [UserPath Documentation](https://userpath.co/docs/track-events#automatic-event-tracking) for the full list.

#### 2. Semantic HTML Implementation
Enhanced automatic tracking with meaningful data attributes:

**Page Sections**:
- `data-section="filters"` - Product filtering area
- `data-section="product-grid"` - Cat catalog display
- `data-section="order-summary"` - Shopping cart summary

**User Actions**:
- `data-action="quick-add"` - Add cat to cart
- `data-action="checkout"` - Start adoption process
- `data-action="clear-search"` - Reset filters

**Form Elements**:
- `data-form="contact"` - Contact form identification
- `data-field="email"` - Form field types
- `data-filter="breed"` - Search filter controls

#### 3. Essential Custom Events
Business-critical events that require custom tracking:

**E-commerce & Adoption Tracking**:
- Add to cart / remove from cart events
- Adoption process initiation and completion
- Purchase completion using UserPath's native purchase event
- Failed adoption attempts (cat already adopted)

**Business Conversions**:
- Lead generation from contact forms
- Newsletter subscription completions
- User registration and onboarding

### Implementation Details

#### Browser Pixel (Alternative)
As an alternative to the JavaScript SDK, you can use the browser pixel by uncommenting this code in `src/app/layout.tsx`:
```jsx
{process.env.NEXT_PUBLIC_USERPATH_APP_ID && (
  <script
    src="https://api.userpath.co/v1/px.js"
    data-app={process.env.NEXT_PUBLIC_USERPATH_APP_ID}
    async
  />
)}
```

**Note**: The JavaScript SDK provides more features for custom event tracking, which is why it's the primary integration method in this demo.

#### JavaScript SDK
- **Configuration**: `src/lib/userpath.ts`
- **Provider Component**: `src/components/userpath-provider.tsx`
- **Custom Hook**: `useUserPath()` for essential business events only

#### Usage Example
```tsx
import { useUserPath } from '@/components/userpath-provider';

function MyComponent() {
  const { trackEvent, trackPurchase } = useUserPath();

  // ✅ DO: Track business-critical events
  const handleAddToCart = (product) => {
    addToCart(product); // Business logic first
    
    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      cart_size: cartItems.length + 1
    });
  };

  // ✅ DO: Use UserPath's native purchase event for conversions
  const handlePurchaseComplete = (orderTotal, orderData) => {
    trackPurchase(orderTotal, 'USD', {
      order_id: orderData.id,
      payment_method: 'stripe',
      customer_type: 'returning',
      items_count: orderData.items.length
    });
  };

  return (
    <div>
      {/* ✅ DO: Use semantic HTML for automatic tracking */}
      <button 
        onClick={handleAddToCart}
        data-action="add-to-cart"
        data-product-id={product.id}
      >
        Add to Cart
      </button>
      
      {/* ❌ DON'T: Track basic clicks - UserPath does this automatically */}
      <button onClick={() => trackEvent('button_clicked')}>
        Basic Button
      </button>
    </div>
  );
}
```

### Getting Started

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Configure UserPath**:
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local and add your UserPath app ID
   # NEXT_PUBLIC_USERPATH_APP_ID=your_actual_app_id_here
   ```

3. **Start development server**:
   ```bash
   bun run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Test tracking**:
   - Browse the cat catalog to see automatic click and scroll tracking
   - Use the search filters (automatically tracked with semantic attributes)
   - Add cats to cart to see essential e-commerce event tracking
   - Complete the checkout process to see UserPath's native purchase event tracking
   - Check the browser console for UserPath initialization messages
   - Events will appear in your UserPath dashboard

### Demo Features

This realistic cat adoption website includes:

- **Home** (`/`) - Hero section with featured cats and semantic tracking
- **Cat Catalog** (`/cats`) - Product listing with automatic filter and click tracking
- **Shopping Cart** (`/cart`) - E-commerce events with semantic HTML attributes
- **About Us** (`/about`) - Content engagement with automatic scroll tracking
- **Contact** (`/contact`) - Form interactions tracked automatically

### E-commerce Features

- 🐱 **Real cat data** from The Cat API with generated adoption details
- 🛒 **Shopping cart** with persistent storage and essential event tracking
- 🔍 **Search & filtering** with automatic interaction tracking via semantic HTML
- 💰 **Realistic pricing** with sales and adoption fees
- 📱 **Responsive design** optimized for all devices
- 🎯 **Complete adoption flow** with UserPath's native purchase event tracking
- 💳 **Purchase simulation** with order ID generation and comprehensive purchase data

### File Structure

```
src/
├── app/
│   ├── layout.tsx          # UserPath browser pixel integration + navigation
│   ├── page.tsx            # Home page with semantic HTML examples
│   ├── about/page.tsx      # Automatic scroll tracking demonstration
│   ├── cats/page.tsx       # Product catalog with semantic attributes
│   ├── cart/page.tsx       # E-commerce events and semantic HTML
│   ├── contact/page.tsx    # Automatic form tracking examples
│   └── globals.css         # Global styles
├── components/
│   ├── navigation.tsx      # Navigation with semantic attributes
│   └── userpath-provider.tsx # UserPath SDK initialization and essential events hook
├── contexts/
│   └── cart-context.tsx    # Shopping cart with essential e-commerce tracking
└── lib/
    ├── userpath.ts         # UserPath configuration with auto-tracking enabled
    ├── cat-api.ts          # Mock cat data generation
    └── types.ts            # TypeScript type definitions
```

### Analytics Dashboard

View your analytics data in the [UserPath Dashboard](https://userpath.co/dashboard). The integration provides:

- Real-time user activity monitoring
- AI-powered insights and chat functionality  
- Automatic event analysis (clicks, scrolls, forms, etc.)
- Essential business event tracking
- Performance monitoring with Core Web Vitals

### Learn More

- [UserPath Documentation](https://userpath.co/docs)
- [UserPath Setup Guide](https://userpath.co/docs/setup-pixel)
- [Automatic Event Tracking](https://userpath.co/docs/track-events#automatic-event-tracking)
- [Custom Event Best Practices](https://userpath.co/docs/track-events#custom-event-tracking)
- [Next.js Documentation](https://nextjs.org/docs)

---

### Environment Setup

The application uses environment variables for configuration:

1. **Copy the example file**: `cp .env.example .env.local`
2. **Set your app ID**: Edit `.env.local` and replace `your_userpath_app_id_here` with your actual UserPath app ID
3. **Optional**: Configure a custom server URL if needed

The demo comes with a pre-configured app ID for immediate testing, but you should replace it with your own for production use.

---

**Note**: This is a demonstration application. In production, ensure you have proper consent mechanisms for analytics tracking in compliance with privacy regulations.
