
import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "top-10-tips-for-first-time-renters",
    title: "Top 10 Tips for First-Time Renters",
    excerpt: "Navigating the rental market for the first time can be daunting. Here are our top 10 tips to help you find your perfect home without the stress.",
    content: `
      <h2>Introduction</h2>
      <p>Renting your first apartment is an exciting milestone, but it can also be a complex process. From finding the right place to understanding your lease, there's a lot to consider. This guide will walk you through the essential steps to make your first rental experience a success.</p>
      
      <h3>1. Determine Your Budget</h3>
      <p>Before you start looking, figure out how much you can comfortably afford. A common rule of thumb is to not spend more than 30% of your gross monthly income on rent.</p>
      
      <h3>2. Know Your Rights</h3>
      <p>Familiarize yourself with tenant rights in your city and state. This knowledge is crucial if you run into issues with your landlord or living conditions.</p>

      <h3>3. Read the Lease Carefully</h3>
      <p>Don't just skim it. The lease is a legally binding contract. Pay close attention to clauses about the security deposit, maintenance responsibilities, and rules about guests or pets.</p>
      
      <h3>4. Document Everything</h3>
      <p>Take photos of the property before you move in to document its condition. Keep a record of all communication with your landlord, preferably in writing.</p>

      <h3>5. Consider Renter's Insurance</h3>
      <p>Your landlord's insurance doesn't cover your personal belongings. Renter's insurance is an affordable way to protect yourself against theft or damage.</p>
      
      <p>Follow these tips, and you'll be well on your way to a smooth and successful rental journey. Welcome home!</p>
    `,
    image: "https://placehold.co/800x600.png",
    author: {
      name: "Jane Doe",
      avatar: "https://placehold.co/100x100.png",
      bio: "Jane is a real estate expert with over a decade of experience in the rental market, dedicated to helping tenants find their dream homes."
    },
    date: "August 12, 2024",
    readTime: "5 min read",
    tags: ["Renting 101", "Tips"],
  },
  {
    slug: "how-to-spot-a-rental-scam",
    title: "How to Spot a Rental Scam",
    excerpt: "Rental scams are on the rise. Learn the red flags to watch out for to protect yourself from fraud and find a legitimate listing.",
    content: `
      <h2>Introduction</h2>
      <p>While online rental platforms offer incredible convenience, they can also be a hunting ground for scammers. Being informed is your best defense. Here are the most common red flags to look out for.</p>

      <h3>1. They Ask for Money Upfront</h3>
      <p>Never send money to someone you haven't met for a property you haven't seen. Scammers often ask for a deposit or first month's rent to "hold" the property for you.</p>

      <h3>2. The Deal Seems Too Good to Be True</h3>
      <p>If a listing for a luxury apartment in a prime location is priced significantly below market rate, be very skeptical. Scammers use low prices to lure in potential victims.</p>

      <h3>3. They Refuse to Meet in Person</h3>
      <p>A common excuse is that the "owner" is out of the country or otherwise unavailable. A legitimate landlord or property manager will arrange for you to see the property.</p>

      <h3>4. High-Pressure Tactics</h3>
      <p>Scammers may claim that many other people are interested and that you must act immediately to secure the rental. This is a tactic to get you to make a hasty decision without proper vetting.</p>

      <p>By staying vigilant and trusting your instincts, you can safely navigate the rental market. At GharBhada, we verify all listings to add an extra layer of security.</p>
    `,
    image: "https://placehold.co/800x600.png",
    author: {
      name: "John Smith",
      avatar: "https://placehold.co/100x100.png",
      bio: "John is a security analyst who specializes in online fraud prevention and consumer protection."
    },
    date: "August 5, 2024",
    readTime: "4 min read",
    tags: ["Security", "Scams"],
  },
  {
    slug: "understanding-your-rental-agreement",
    title: "Understanding Your Rental Agreement",
    excerpt: "A rental agreement is a legally binding document. We break down the key components you need to understand before you sign.",
    content: `
      <h2>The Lease is Your Key</h2>
      <p>Your rental agreement, or lease, outlines the terms and conditions of your tenancy. Understanding it fully is essential for a positive rental experience. Let's break down the key sections.</p>

      <h3>The Parties Involved</h3>
      <p>This section should clearly state the names of the landlord (lessor) and the tenant(s) (lessee).</p>

      <h3>Lease Term</h3>
      <p>This specifies the duration of the lease, whether it's a fixed term (like one year) or a month-to-month agreement.</p>

      <h3>Rent and Security Deposit</h3>
      <p>Look for the exact rent amount, the due date, and any penalties for late payments. This section will also detail the security deposit amount and the conditions for its return.</p>

      <h3>Maintenance and Repairs</h3>
      <p>The lease should clarify who is responsible for what. Typically, landlords handle major repairs, while tenants are responsible for general upkeep.</p>

      <p>Never hesitate to ask for clarification on any part of the lease you don't understand. Our digital contract generator can help create clear and fair agreements for both parties.</p>
    `,
    image: "https://placehold.co/800x600.png",
    author: {
      name: "Alex Johnson",
      avatar: "https://placehold.co/100x100.png",
      bio: "Alex is a legal expert specializing in real estate law, committed to making legal documents accessible to everyone."
    },
    date: "July 28, 2024",
    readTime: "6 min read",
    tags: ["Legal", "Contracts"],
  }
];
