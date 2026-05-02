export const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];
export const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed', 'Won\'t Fix'];
export const MODULES = ['Authentication', 'Cart & Checkout', 'Search', 'Product Listing', 'User Profile', 'Payments', 'Notifications', 'Admin Panel'];

export const initialBugs = [
  {
    id: 'BUG-001',
    title: 'Checkout crashes on mobile Safari when applying coupon code',
    description: 'When a user applies a valid coupon code during checkout on iOS Safari 16+, the page crashes and returns a blank screen. This occurs 100% of the time on iPhone 13 and 14 devices.',
    severity: 'Critical',
    status: 'Open',
    module: 'Cart & Checkout',
    reporter: 'Sarah Chen',
    assignee: 'Dev Team',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-03',
    steps: [
      'Open checkout page on iOS Safari',
      'Add item to cart',
      'Enter coupon code "SAVE10"',
      'Click Apply',
      'Page crashes'
    ],
    expected: 'Coupon applied and discount shown in total',
    actual: 'Page crashes with blank screen',
    environment: 'iOS 16, Safari, iPhone 13'
  },
  {
    id: 'BUG-002',
    title: 'Search returns no results for exact product name match',
    description: 'Searching for an exact product name (e.g., "Blue Denim Jacket") returns 0 results, while searching partial terms works fine.',
    severity: 'High',
    status: 'In Progress',
    module: 'Search',
    reporter: 'Marcus Roy',
    assignee: 'Backend Team',
    createdAt: '2024-05-28',
    updatedAt: '2024-06-02',
    steps: [
      'Go to homepage',
      'Enter exact product name in search bar',
      'Press Enter or click search icon'
    ],
    expected: 'Matching products displayed',
    actual: 'Empty results page shown',
    environment: 'All browsers, Production'
  },
  {
    id: 'BUG-003',
    title: 'Login form autofill breaks validation state',
    description: 'When browser autofill populates the login form, the submit button remains disabled as if the fields are empty.',
    severity: 'Medium',
    status: 'Resolved',
    module: 'Authentication',
    reporter: 'Priya Nair',
    assignee: 'Frontend Team',
    createdAt: '2024-05-20',
    updatedAt: '2024-05-30',
    steps: [
      'Open login page',
      'Allow browser to autofill credentials',
      'Do NOT click inside any field'
    ],
    expected: 'Submit button becomes active after autofill',
    actual: 'Submit button stays disabled',
    environment: 'Chrome 124, Firefox 126'
  },
  {
    id: 'BUG-004',
    title: 'Cart total incorrect when applying percentage discount with free shipping',
    description: 'Applying a percentage-based coupon code when the cart already qualifies for free shipping results in an incorrect total calculation.',
    severity: 'Critical',
    status: 'Open',
    module: 'Cart & Checkout',
    reporter: 'James O\'Brien',
    assignee: 'Unassigned',
    createdAt: '2024-06-03',
    updatedAt: '2024-06-03',
    steps: [
      'Add items totaling over £50 (free shipping threshold)',
      'Apply 10% discount coupon',
      'Check order total'
    ],
    expected: 'Total = subtotal × 0.9',
    actual: 'Total shows original shipping cost deducted twice',
    environment: 'All browsers, Staging & Production'
  },
  {
    id: 'BUG-005',
    title: 'Profile picture upload silently fails for images > 2MB',
    description: 'Uploading a profile image larger than 2MB shows a success toast but the image is never updated. No error is shown to the user.',
    severity: 'Medium',
    status: 'Open',
    module: 'User Profile',
    reporter: 'Sarah Chen',
    assignee: 'Frontend Team',
    createdAt: '2024-05-25',
    updatedAt: '2024-05-25',
    steps: [
      'Go to account settings',
      'Upload profile image larger than 2MB',
      'Wait for response'
    ],
    expected: 'Error message: "Image must be under 2MB"',
    actual: 'Success toast shown, but image unchanged',
    environment: 'All browsers'
  },
  {
    id: 'BUG-006',
    title: 'Email notifications not sent after password reset',
    description: 'Users do not receive password reset confirmation emails. The reset still works, but no email is dispatched.',
    severity: 'High',
    status: 'In Progress',
    module: 'Notifications',
    reporter: 'Marcus Roy',
    assignee: 'Backend Team',
    createdAt: '2024-05-18',
    updatedAt: '2024-06-01',
    steps: [
      'Click "Forgot Password"',
      'Enter registered email',
      'Complete password reset flow'
    ],
    expected: 'Confirmation email sent',
    actual: 'No email received (checked spam)',
    environment: 'Production only'
  },
  {
    id: 'BUG-007',
    title: 'Product images missing alt text — accessibility violation',
    description: 'All product listing images are missing alt attributes, causing screen reader failures and WCAG 2.1 AA violations.',
    severity: 'Low',
    status: "Won't Fix",
    module: 'Product Listing',
    reporter: 'Priya Nair',
    assignee: 'Frontend Team',
    createdAt: '2024-05-10',
    updatedAt: '2024-05-15',
    steps: [
      'Open product listing page',
      'Inspect any product image element'
    ],
    expected: 'alt="[Product name]" on all images',
    actual: 'alt="" (empty) on all product images',
    environment: 'All environments'
  },
  {
    id: 'BUG-008',
    title: 'Admin panel bulk delete crashes for >50 selected items',
    description: 'Selecting more than 50 items in the admin product list and clicking bulk delete causes a 504 Gateway Timeout.',
    severity: 'High',
    status: 'Closed',
    module: 'Admin Panel',
    reporter: 'James O\'Brien',
    assignee: 'Backend Team',
    createdAt: '2024-04-30',
    updatedAt: '2024-05-12',
    steps: [
      'Log in as admin',
      'Select 50+ products',
      'Click "Delete selected"'
    ],
    expected: 'All items deleted, success message shown',
    actual: '504 Gateway Timeout after 30 seconds',
    environment: 'Production'
  }
];
