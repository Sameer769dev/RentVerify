
export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="lead">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Introduction</h2>
      <p>
        Welcome to GharBhada. We are committed to protecting your personal
        information and your right to privacy. If you have any questions or
        concerns about our policy, or our practices with regards to your
        personal information, please contact us.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We collect personal information that you voluntarily provide to us when
        you register on the Service, express an interest in obtaining
        information about us or our products and services, when you participate
        in activities on the Service or otherwise when you contact us.
      </p>
      <p>The personal information that we collect depends on the context of your interactions with us and the Service, the choices you make and the products and features you use. The personal information we collect may include the following:</p>
      <ul>
        <li><strong>Personal Information Provided by You.</strong> We collect names; phone numbers; email addresses; mailing addresses; usernames; passwords; and other similar information.</li>
        <li><strong>KYC Information.</strong> For property owners, we collect identity documents for verification purposes. This data is handled securely and used solely for verification.</li>
        <li><strong>Payment Data.</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>
        We use personal information collected via our Service for a variety of
        business purposes described below.
      </p>
      <ul>
          <li>To facilitate account creation and logon process.</li>
          <li>To post testimonials.</li>
          <li>Request feedback.</li>
          <li>To enable user-to-user communications.</li>
          <li>To manage user accounts.</li>
      </ul>

      <h2>4. Will Your Information Be Shared With Anyone?</h2>
      <p>
        We only share information with your consent, to comply with laws, to
        provide you with services, to protect your rights, or to fulfill
        business obligations. We may process or share your data that we hold
        based on the following legal basis:
      </p>
      <ul>
          <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
          <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
          <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
      </ul>
    </>
  );
}
