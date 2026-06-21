import {
  Building2,
  CreditCard,
  Briefcase,
  Home,
  CarFront,
  Wallet,
  ShieldCheck,
  Globe,
  Truck,
  Factory,
  Stethoscope,
  Sparkles
} from "lucide-react";

export const servicesData = {
  "private-finance": {
    id: "private-finance",
    title: "Private Finance",
    subtitle: "High-Liquidity Custom Bridge Funding Solutions",
    icon: Sparkles,
    bannerImage: "/private-finance-detail.jpeg",
    overview: "Private Finance represents our flagship custom credit solution, specifically engineered for businesses, promoters, and high-net-worth individuals who require immediate liquidity. Traditional bank lending structures, while cost-effective, often struggle with speed, unconventional asset classes, or short-term requirements. Our private finance solutions bridge this gap by focusing on asset strength, transaction validity, and cash flow rather than traditional credit score metrics. Whether you need emergency operations funding, bridging capital for business acquisitions, or short-term funding for asset purchase, our bespoke underwriting process delivers decisions in hours rather than weeks.",
    meta: {
      highlights: [
        "No CIBIL Score Required",
        "Approval within 24–48 Hours",
        "Tenure from 3 Months to 15 Months",
        "Fast & Non-Bureau Centric Processing",
        "Flexible Repayment Frameworks",
        "Simplified & Swift Documentation"
      ]
    },
    benefits: [
      "Access capital without the strict CIBIL score limitations of retail banks.",
      "Accelerated processing ensures funds are deployed within 24 to 48 hours.",
      "Tenure structures tailored specifically from 3 to 15 months to match your liquidity event.",
      "Custom repayment frameworks built around your specific seasonal cash flow or receivables timeline.",
      "Discreet and professional consultation with dedicated relationship directors."
    ],
    features: [
      "Bridge Finance: Secure immediate funding to cover gaps before long-term capital is closed.",
      "Business Cash Requirements: Smooth out working capital dips or purchase inventory at deep discounts.",
      "Emergency Funding: Protect your company from unexpected operational shortfalls or regulatory demands."
    ],
    eligibility: [
      "Active business operations for a minimum of 2 years.",
      "Minimum monthly turnover of ₹25 Lakhs.",
      "Clear title on offered collateral (residential, commercial, or select industrial property).",
      "Demonstrated repayment capacity via active business cash flows (bank statements)."
    ],
    howItWorks: [
      { step: 1, title: "Initial Consultation", desc: "Briefing on liquidity requirements and preliminary assessment of available assets/cash flows." },
      { step: 2, title: "Simplified Documentation", desc: "Submission of basic KYC, banking records, and property or asset documents without long history demands." },
      { step: 3, title: "Custom Structuring", desc: "Our underwriting team designs a custom 3-to-15 month repayment framework tailored to your cash flow." },
      { step: 4, title: "Rapid Approval & Disbursal", desc: "Final sanction within 24 hours, followed by prompt disbursal to secure your operational runway." }
    ],
    faqs: [
      {
        question: "Is a low CIBIL score a barrier to getting approved for Private Finance?",
        answer: "No. Our private finance structures prioritize active cash flows and overall business transaction validity rather than bureau ratings. We evaluate the present and future viability of your business."
      },
      {
        question: "What is the typical tenure for these funds?",
        answer: "Our private finance is designed as short-to-medium term liquidity, ranging from 3 months to 15 months. It is ideal as a bridge to a larger financial event or business cycle."
      },
      {
        question: "How fast can I expect disbursal?",
        answer: "Once the primary documentation is verified, approvals are usually issued within 24 hours, and disbursals are completed within 48 hours."
      }
    ],
    whyChooseUs: "GGE specializes in structuring high-value private debt. We maintain absolute discretion, charge transparent rates, and cut through bureaucratic red tape to deliver capital when speed is your primary constraint.",
    relatedServices: ["business-loans", "cheque-based-finance", "working-capital-solutions"]
  },

  "business-loans": {
    id: "business-loans",
    title: "Business Loans",
    subtitle: "Strategic Commercial Funding Through Premium Networks",
    icon: Building2,
    bannerImage: "/business-loans-detail.jpeg",
    overview: "Our Business Loan solutions provide structured capital designed to fuel enterprise growth, capital expenditure, and market expansion. Operating in collaboration with leading public, private, and non-banking financial institutions (NBFCs), we match your firm's profile with the lender most aligned to your industry segment. Rather than presenting generic applications, we build a comprehensive financial case that highlights your historical performance, market position, and projected revenue growth. This custom presentation ensures you receive competitive interest rates, maximum loan amounts, and flexible tenure options.",
    meta: {
      highlights: [
        "Unsecured & Secured Options Available",
        "Collaborations with 20+ Banks and NBFCs",
        "Flexible repayment terms up to 5 years",
        "Competitive interest rates tailored to industry standards",
        "Expert assistance in documentation and balance sheet representation"
      ]
    },
    benefits: [
      "Access substantial credit facilities based on business cash flow history.",
      "Competitive rate structures through multi-lender comparison.",
      "Minimal disruption with professional document preparation and management.",
      "Capital deployment optimized for expansion, technology upgrades, or operational scale."
    ],
    features: [
      "Term Loans: Long-term funding for permanent capital expenditure and growth.",
      "NBFC Specialized Lending: Flexible criteria for companies in transition or fast-growth phases.",
      "Unsecured Loans: Fast-turnaround capital without placing assets as security."
    ],
    eligibility: [
      "Minimum 3 years of audited financial statements.",
      "Positive net worth and EBITDA trends.",
      "Clear banking records with no major defaults.",
      "Minimum annual business turnover of ₹50 Lakhs."
    ],
    howItWorks: [
      { step: 1, title: "Profile Analysis", desc: "We review your balance sheets, debt-to-equity ratios, and cash flows to evaluate borrowing capacity." },
      { step: 2, title: "Lender Matching", desc: "Select and target the top 3-4 banks or NBFCs that specialize in your industry sector." },
      { step: 3, title: "File Representation", desc: "Compile and present a structured underwriting file directly to credit decision-makers." },
      { step: 4, title: "Sanction & Disbursal", desc: "Negotiate interest rates and loan agreements, leading to direct bank disbursal." }
    ],
    faqs: [
      {
        question: "What is the maximum loan tenure?",
        answer: "Unsecured business loans typically go up to 3 to 5 years, while secured business terms can extend significantly longer depending on the collateral asset."
      },
      {
        question: "Can startup companies apply?",
        answer: "We primarily work with businesses having at least 2-3 years of operational history. However, for well-backed startups, we can explore specialized VC-debt or NBFC structures."
      }
    ],
    whyChooseUs: "We don't just submit forms; we act as your strategic financial advocate, ensuring your business's financial health is presented optimally to top lenders.",
    relatedServices: ["working-capital-solutions", "machinery-purchase-finance", "private-finance"]
  },

  "cheque-based-finance": {
    id: "cheque-based-finance",
    title: "Cheque Based Finance",
    subtitle: "Short-Term Liquidity Against Documented Cash Flow Cycles",
    icon: CreditCard,
    bannerImage: "/cheque-finance-detail.jpeg",
    overview: "Cheque Based Finance is a highly specialized transactional lending structure designed to support immediate cash flow requirements. This facility leverages your recurring business receivables and customer transactions, secured through post-dated cheque frameworks and escrow allocations. It is a highly effective tool for businesses experiencing temporary working capital gaps due to extended credit terms with clients. By converting future cheque clearances into immediate operational liquidity, you can bridge salary payouts, purchase raw materials, and maintain business momentum without waiting for payment cycles to close.",
    meta: {
      highlights: [
        "Immediate liquidity against clearing schedules",
        "Minimal financial bureau dependencies",
        "Fast assessment based on bank statement clearance patterns",
        "Flexible funding ticket sizes",
        "Repayment aligned with buyer credit cycles"
      ]
    },
    benefits: [
      "Speed of execution, often within 24-48 hours of checking bank statement history.",
      "Allows you to fulfill bulk orders by procuring raw materials immediately.",
      "Maintains vendor goodwill through early or on-time payouts.",
      "Keeps core bank lines free for long-term strategic investments."
    ],
    features: [
      "Receivables Discounting: Unlock capital tied up in outstanding customer invoices.",
      "Cheque Purchase Facility: Present customer cheques due in 30-90 days for immediate advance.",
      "Custom Escrow Structures: Secure repayment directly from your business account clearances."
    ],
    eligibility: [
      "Consistent banking transaction history with recurring deposits.",
      "No history of inward cheque bounces in the past 12 months.",
      "Minimum business operations of 1 year.",
      "Documented purchase orders or clear customer invoices."
    ],
    howItWorks: [
      { step: 1, title: "Transaction Submission", desc: "Submit details of upcoming clearances, invoices, and bank statements." },
      { step: 2, title: "Velocity Check", desc: "Our credit team assesses the historical clearance rate and buyer profiles." },
      { step: 3, title: "Cheque Deposit", desc: "Arrange post-dated cheques or clear escrow mandates according to the invoice dates." },
      { step: 4, title: "Capital Advance", desc: "Receive immediate cash advance, typically up to 80-90% of the invoice value." }
    ],
    faqs: [
      {
        question: "How does cheque-based finance differ from a standard loan?",
        answer: "A standard loan is paid back over years from general cash flows. Cheque-based finance is a transactional advance directly matched to a specific customer invoice or upcoming cheque clearance date."
      },
      {
        question: "What happens if a customer delays their payment?",
        answer: "We structure grace periods and alternate repayment options to ensure operational issues are managed smoothly without impacting your primary credit rating."
      }
    ],
    whyChooseUs: "GGE maintains deep relationships with specialized boutique lenders, offering customized cheque-discounting facilities that traditional retail banks do not provide.",
    relatedServices: ["private-finance", "business-loans", "working-capital-solutions"]
  },

  "professional-loans": {
    id: "professional-loans",
    title: "Professional Loans",
    subtitle: "Custom Credit Facilities for Doctors, CAs, Architects & Consultants",
    icon: Briefcase,
    bannerImage: "/professional-loans-detail.jpeg",
    overview: "Professional Loans are custom-designed financial products engineered specifically for practicing professionals, including medical practitioners, chartered accountants, company secretaries, architects, and engineering consultants. Recognizing that professional practices operate on unique revenue models, banks and NBFCs offer preferential interest rates, relaxed eligibility criteria, and high-value unsecured limits for these segments. Whether you need to upgrade clinic diagnostic equipment, renovate office premises, invest in specialized enterprise software, or expand your practice to multiple locations, our professional loan packages provide the required capital with minimal documentation and fast turnaround.",
    meta: {
      highlights: [
        "Highly competitive interest rates",
        "Unsecured limits up to ₹75 Lakhs without collateral",
        "Flexible tenure options from 12 to 60 months",
        "Direct approval pathways for established practitioners",
        "Simplified balance sheet documentation"
      ]
    },
    benefits: [
      "Preferential pricing structures compared to standard commercial loans.",
      "Preserve personal assets through fully unsecured funding structures.",
      "Speedy approval cycles, often bypassing extensive corporate auditing.",
      "Repayment schedules mapped to seasonal practice revenues."
    ],
    features: [
      "Practice Expansion Capital: Finance office buyouts, medical clinic setups, or new branch networks.",
      "Equipment & Technology Finance: Procure medical machines, specialized testing gear, or software licenses.",
      "Working Capital Lines: Smooth out client billing lags and maintain staff salaries during slower quarters."
    ],
    eligibility: [
      "Valid Professional Degree or Certificate of Practice (COP).",
      "Minimum 3 years of post-qualification experience.",
      "Active practice records or clinic registrations.",
      "Healthy individual CIBIL and credit profile."
    ],
    howItWorks: [
      { step: 1, title: "Degree Verification", desc: "Provide degree certificates, COP records, and basic practice overview." },
      { step: 2, title: "Financial Review", desc: "Submit simple tax records and bank statements showing active professional income." },
      { step: 3, title: "Sanction Design", desc: "Receive customized loan terms, selecting optimal tenure and rate structures." },
      { step: 4, title: "Practice Funding", desc: "Quick disbursal directly into your professional account to initiate practice upgrades." }
    ],
    faqs: [
      {
        question: "Is collateral required for a Professional Loan?",
        answer: "In most cases, no. Established professionals can access fully unsecured funding up to ₹50-75 Lakhs based on their degree credentials and practice income."
      },
      {
        question: "Can I use the funds to purchase medical equipment?",
        answer: "Yes. The loan can be used for clinic upgrades, equipment purchases, office renovations, or general cash flow."
      }
    ],
    whyChooseUs: "We maintain direct, priority desks with top professional lenders, ensuring your profile receives immediate attention, customized terms, and faster processing.",
    relatedServices: ["business-loans", "medical-equipment-finance", "loan-against-property"]
  },

  "loan-against-property": {
    id: "loan-against-property",
    title: "Loan Against Property",
    subtitle: "Unlock Multi-Million Liquidity from Real Estate Assets",
    icon: Home,
    bannerImage: "/lap-detail.jpeg",
    overview: "Loan Against Property (LAP) represents one of the most cost-effective and secure mechanisms to unlock high-value long-term capital. By leveraging the equity built up in your residential, commercial, or industrial real estate assets, you can access substantial funding at interest rates significantly lower than unsecured business loans. LAP is the ideal solution for businesses planning major capital expenditures, debt consolidation, or long-term growth projects. Our team assists in property valuation, legal documentation search, and multi-bank negotiations to ensure you obtain maximum Loan-to-Value (LTV) ratios and extended tenures that make monthly payments highly manageable.",
    meta: {
      highlights: [
        "Highly competitive interest rates (comparable to home loans)",
        "Loan limits up to 75% of market value of the property",
        "Extended tenure structures up to 15 years",
        "Accepted collateral: Residential, Commercial, and Industrial property",
        "Bespoke balance sheet mapping for complex promoter holdings"
      ]
    },
    benefits: [
      "Lower interest rates translate to massive savings over the loan term.",
      "Access substantial capital tickets up to ₹50 Crores or more.",
      "Extended tenures ensure low, highly manageable EMIs that don't strain operations.",
      "Possibility to keep using the property commercially while it is mortgaged."
    ],
    features: [
      "Secured Term Funding: Ideal for industrial construction, real estate buyouts, or major expansions.",
      "Debt Consolidation: Convert expensive short-term unsecured loans into a single low-rate LAP.",
      "Overdraft Against Property: Access a revolving credit line using property equity, paying interest only on utilized funds."
    ],
    eligibility: [
      "Clear, marketable title to the property being offered.",
      "Approved building plan and property tax receipt updates.",
      "Established repayment capacity backed by business profits or salary records.",
      "Minimum property valuation of ₹20 Lakhs."
    ],
    howItWorks: [
      { step: 1, title: "Property Evaluation", desc: "Submit property deeds for legal search and professional technical valuation." },
      { step: 2, title: "Repayment Analysis", desc: "Provide business audits or personal income records to establish creditworthiness." },
      { step: 3, title: "LTV Structuring", desc: "Determine the maximum borrowing limit, typically 50% to 70% of the technical valuation." },
      { step: 4, title: "Legal Mortgage & Disbursal", desc: "Complete mortgage registration and receive funds directly into your business account." }
    ],
    faqs: [
      {
        question: "Can I get a loan against a property that is currently rented?",
        answer: "Yes. Rented commercial or residential property is highly valued by lenders. We can also structure Lease Rental Discounting (LRD) against your active lease agreements."
      },
      {
        question: "What is the typical time frame for LAP approval?",
        answer: "Since property technical and legal evaluation is required, LAP approvals take between 7 to 14 working days. We coordinate all inspections to expedite the process."
      }
    ],
    whyChooseUs: "GGE has an in-house legal and valuation coordination team, minimizing delays and avoiding typical documentation loops that hold up property-backed transactions.",
    relatedServices: ["business-loans", "working-capital-solutions", "machinery-purchase-finance"]
  },

  "car-refinance": {
    id: "car-refinance",
    title: "Car Refinance",
    subtitle: "Unlock Asset Value on Your Personal or Corporate Vehicles",
    icon: CarFront,
    bannerImage: "/car-refinance-detail.jpeg",
    overview: "Car Refinance is a quick, smart financial strategy to unlock cash tied up in your high-value personal or corporate vehicles. If you own a premium vehicle or a fleet of vehicles with clear titles, you can refinance them to secure instant liquidity for business operations or personal requirements. Additionally, if you are currently paying a high interest rate on an active car loan, our refinance program helps transfer your loan to premium lenders at competitive rates, while offering top-up funding options based on the vehicle's current market value.",
    meta: {
      highlights: [
        "Up to 200% IDV (Insured Declared Value) Funding",
        "Fast Approval with minimal bureaucratic delays",
        "48-Hour Processing from application to disbursal",
        "Attractive interest rates on premium vehicle segments",
        "Simple RC transfer and hypothecation management"
      ]
    },
    benefits: [
      "Access instant capital without mortgaging real estate or disrupting core businesses.",
      "LTV ratios up to 200% of vehicle's current IDV for premium models.",
      "Short-term commitments (12 to 60 months) with flexible prepay options.",
      "Keep using your vehicle daily while accessing its equity value."
    ],
    features: [
      "Equity Release Refinance: Secure a fresh cash loan against your fully-owned car.",
      "Balance Transfer + Top-Up: Transfer active high-interest loans to save costs and receive additional funding.",
      "Commercial Fleet Refinance: Unlock capital from logistics and corporate passenger vehicles."
    ],
    eligibility: [
      "Vehicle age must not exceed 8-10 years at loan maturity.",
      "Clear ownership records with RC and active comprehensive insurance.",
      "Minimum salary or business income records showing repayment capacity.",
      "Vehicle must be in active, operational condition."
    ],
    howItWorks: [
      { step: 1, title: "Vehicle Valuation", desc: "Submit RC copy and photos to determine the current Insured Declared Value (IDV)." },
      { step: 2, title: "Credit Assessment", desc: "Provide basic KYC and last 6 months' bank statements for rapid verification." },
      { step: 3, title: "Hypothecation Update", desc: "Complete RTO hypothecation documentation seamlessly with our operations team." },
      { step: 4, title: "48-Hour Disbursal", desc: "Funds are credited directly to your bank account with the vehicle remaining in your custody." }
    ],
    faqs: [
      {
        question: "Can I refinance a car that is currently on an active loan?",
        answer: "Yes. We can settle your outstanding loan with your current lender, transfer the account to a new lender with lower rates, and pay out the surplus equity as a cash top-up."
      },
      {
        question: "What percentage of the car value can I borrow?",
        answer: "Lenders offer up to 150%-200% of the vehicle's current Insured Declared Value (IDV) depending on the vehicle category and your income profile."
      }
    ],
    whyChooseUs: "We provide door-step document collection, handle all RTO coordination, and complete valuation in hours, making car refinance one of our fastest liquidity options.",
    relatedServices: ["private-finance", "professional-loans", "cheque-based-finance"]
  },

  "working-capital-solutions": {
    id: "working-capital-solutions",
    title: "Working Capital Solutions",
    subtitle: "Custom Credit Lines to Power Everyday Business Operations",
    icon: Wallet,
    bannerImage: "/working-capital-detail.jpeg",
    overview: "Managing day-to-day liquidity is critical for maintaining business momentum, handling supplier relationships, and seizing short-term procurement opportunities. Our Working Capital Solutions package combines structured short-term credit facilities tailored to your cash conversion cycle. We analyze your debtor days, inventory turnover, and creditor timelines to structure facilities like Overdraft (OD), Cash Credit (CC), and collateral-free government schemes like CGTMSE. This ensures your operational expenses, salary commitments, and inventory procurements are funded smoothly, allowing your business to scale without liquidity constraints.",
    meta: {
      highlights: [
        "Overdraft (OD) & Cash Credit (CC) Facilities",
        "Collateral-free options under CGTMSE scheme (up to ₹5 Crores)",
        "Interest payable only on the utilized amount",
        "Seamless annual renewal processes",
        "Structured letter-of-credit and trade linkages"
      ]
    },
    benefits: [
      "Optimize cash flow by paying interest exclusively on the capital you withdraw.",
      "Avoid equity dilution or long-term debt burdens by utilizing revolving credit.",
      "Acquire inventory at bulk discounts using instant liquidity drafts.",
      "Access large limits without collateral through government guarantee linkages."
    ],
    features: [
      "Secured Overdraft: Leverage fixed deposits, property, or financial assets for instant cash limits.",
      "Cash Credit (CC): Revolving funding facility secured against business inventory and receivables.",
      "CGTMSE Trust Funding: Collateral-free working capital lines specifically for MSMEs."
    ],
    eligibility: [
      "Registered business entity with GST registration for at least 2 years.",
      "Healthy debt service coverage ratio (DSCR).",
      "Consistent stock and debtor records.",
      "Annual turnover of ₹1 Crore and above."
    ],
    howItWorks: [
      { step: 1, title: "Cycle Analysis", desc: "We map your inventory, receivables, and payables cycles to determine capital gaps." },
      { step: 2, title: "Limit Structuring", desc: "Design a combination of CC/OD limits and collateral-free CGTMSE options." },
      { step: 3, title: "Credit Assessment", desc: "Lenders review stock statements, debtor ageing lists, and GST filings." },
      { step: 4, title: "Limit Activation", desc: "The revolving account is set up, allowing you to withdraw and deposit cash freely." }
    ],
    faqs: [
      {
        question: "How does Cash Credit differ from Overdraft?",
        answer: "Cash Credit (CC) is specifically secured against stock and receivables, requiring monthly stock statements. Overdraft (OD) is typically backed by fixed assets or deposits and offers more operational flexibility."
      },
      {
        question: "Is it possible to secure working capital without collateral?",
        answer: "Yes. Under the government's CGTMSE scheme, eligible MSME units can secure working capital limits up to ₹5 Crores without providing collateral security."
      }
    ],
    whyChooseUs: "We specialized in detailed debt modeling, ensuring we secure working capital limits that accurately match your business requirements, avoiding under-funding or high renewal fees.",
    relatedServices: ["business-loans", "machinery-purchase-finance", "bank-guarantee"]
  },

  "bank-guarantee": {
    id: "bank-guarantee",
    title: "Bank Guarantee",
    subtitle: "Strengthen Corporate Tenders & Contract Execution",
    icon: ShieldCheck,
    bannerImage: "/bank-guarantee-detail.jpeg",
    overview: "A Bank Guarantee (BG) is a critical corporate credit instrument that enhances your business credibility, allowing you to bid for major government contracts, secure raw materials, and execute infrastructure projects. By issuing a BG, the bank acts as a guarantor, assuring your client or beneficiary of performance or payment security. We assist you in establishing BG limits with premium banks, structuring margin money requirements, and managing underwriting timelines, enabling your firm to secure and execute contracts with complete financial backing.",
    meta: {
      highlights: [
        "Financial & Performance Guarantees",
        "Negotiated low margin money requirements",
        "Issuance from premium Tier-1 public and private banks",
        "Fast processing for time-sensitive bidding deadlines",
        "Structured collateral allocations"
      ]
    },
    benefits: [
      "Participate in high-value tenders and government contracts.",
      "Preserve operational cash by replacing cash deposits with bank guarantees.",
      "Establish immediate trust with international buyers and suppliers.",
      "Minimize project mobilization delays via prompt security issuance."
    ],
    features: [
      "Performance Bank Guarantee (PBG): Assures the beneficiary that the project will be executed as per terms.",
      "Financial Bank Guarantee (FBG): Secures payment obligations to vendors or tax authorities.",
      "Bid Bond Guarantee: Enables participation in commercial auctions and tenders without lock-in cash."
    ],
    eligibility: [
      "Established track record of project execution or trade history.",
      "Collateral or cash margin support (typically 10% to 30% depending on profile).",
      "Audited financial statements demonstrating stable corporate net worth.",
      "Active corporate banking account."
    ],
    howItWorks: [
      { step: 1, title: "Contract Review", desc: "Analyze tender or project documentation to determine BG format and values." },
      { step: 2, title: "Limit Establishment", desc: "Structure a BG limit within your existing banking facilities or establish a new line." },
      { step: 3, title: "Margin Allocation", desc: "Determine margin money deposits (FDs) or collateral security shares." },
      { step: 4, title: "Guarantor Issuance", desc: "Bank issues the physical or SFMS-transmitted guarantee to the beneficiary." }
    ],
    faqs: [
      {
        question: "What is SFMS transmission?",
        answer: "SFMS (Structured Financial Messaging System) is a secure communication channel banks use to transmit and verify bank guarantees electronically, preventing document fraud."
      },
      {
        question: "Can I secure a Bank Guarantee against 100% cash margin?",
        answer: "Yes. If you do not have active credit limits, we can coordinate with partner banks to issue BGs rapidly against 100% Fixed Deposit backing, with minimal documentation."
      }
    ],
    whyChooseUs: "GGE has dedicated corporate desk links that speed up bank limit setups and verify SFMS transmissions within hours, keeping you ahead of tender deadlines.",
    relatedServices: ["letter-of-credit", "working-capital-solutions", "packing-credit"]
  },

  "letter-of-credit": {
    id: "letter-of-credit",
    title: "Letter of Credit",
    subtitle: "Facilitate Global & Domestic Trade with Bank-Backed Security",
    icon: Globe,
    bannerImage: "/letter-of-credit-detail.jpeg",
    overview: "A Letter of Credit (LC) is a globally recognized payment mechanism that mitigates risk in domestic and international trade. Serving as a bank-backed undertaking, an LC guarantees that the buyer's payment to the seller will be made on time and for the correct amount, contingent upon the seller presenting matching shipping documents. Whether you are importing raw materials from global suppliers or buying capital machinery domestically, LC limits ensure your trade transactions are secure, compliant, and structured to optimize procurement costs.",
    meta: {
      highlights: [
        "Inland & Import Letters of Credit (ILC / FLC)",
        "Sight and Usance options tailored to shipping cycles",
        "Recognized by major international suppliers and trade lines",
        "Negotiated commission structures to lower transaction costs",
        "Seamless integration with packing credit facilities"
      ]
    },
    benefits: [
      "Eliminate credit risk when dealing with new suppliers domestically or globally.",
      "Procure raw materials on credit terms (Usance LC) while suppliers receive cash security.",
      "Ensure quality and compliance since payment is conditional on documentary proof of shipping.",
      "Strengthen purchasing power to negotiate better prices with international exporters."
    ],
    features: [
      "Sight Letter of Credit: Payment is cleared immediately upon presentation of valid shipping documents.",
      "Usance Letter of Credit: Offers deferred payment terms (e.g., 90 or 180 days) to match your sales cycle.",
      "Standby Letter of Credit (SBLC): Serves as a secondary payment guarantee if the buyer defaults."
    ],
    eligibility: [
      "Active Import-Export Code (IEC) for international trade.",
      "Established business operations of at least 2 years.",
      "Credit assessment showing stable debt-servicing limits.",
      "Margin backing or collateral allocation."
    ],
    howItWorks: [
      { step: 1, title: "Proforma Invoice Review", desc: "Review the trade contract and proforma invoice to align payment terms." },
      { step: 2, title: "LC Limit Structuring", desc: "Establish trade credit lines and configure margins with our partner banks." },
      { step: 3, title: "LC Issuance", desc: "Issuing bank drafts and transmits the LC via SWIFT network to the supplier's bank." },
      { step: 4, title: "Document Presentation", desc: "Supplier ships goods, submits documents to bank, and clears payment according to terms." }
    ],
    faqs: [
      {
        question: "What is the difference between Sight and Usance LC?",
        answer: "A Sight LC requires payment immediately when valid documents are presented. A Usance LC allows the buyer to pay after a set period (e.g., 60, 90, or 180 days), providing built-in trade credit."
      },
      {
        question: "Can GGE help arrange LC limits for raw material imports?",
        answer: "Yes. We specialize in structuring trade finance programs, setting up new LC lines, and integrating them with working capital accounts."
      }
    ],
    whyChooseUs: "We optimize your trade finance cost structure by negotiating down bank commission rates and structuring Usance periods that match your actual sales velocity.",
    relatedServices: ["bank-guarantee", "packing-credit", "machinery-purchase-finance"]
  },

  "packing-credit": {
    id: "packing-credit",
    title: "Packing Credit",
    subtitle: "Pre-Shipment Finance to Fund Global Export Contracts",
    icon: Truck,
    bannerImage: "/packing-credit-detail.jpeg",
    overview: "Packing Credit is a specialized pre-shipment financing facility designed specifically for exporters to fund the purchase, processing, manufacturing, and packaging of goods before shipment. Recognizing that export orders require significant upfront capital before revenues are realized, banks offer packing credit in both domestic currency and foreign currency (PCFC). This ensures exporters can purchase raw materials, fund labor, and cover manufacturing costs without draining cash flow, allowing them to scale their global trading operations seamlessly.",
    meta: {
      highlights: [
        "Pre-Shipment financing against Export Orders or Letters of Credit",
        "PCFC (Packing Credit in Foreign Currency) available to minimize currency risks",
        "Highly competitive interest rates aligned with export incentives",
        "Repayment linked directly to export realizations",
        "Structured linkage with Post-Shipment discounting options"
      ]
    },
    benefits: [
      "Access immediate capital to execute export orders smoothly.",
      "Borrow in foreign currency (PCFC) to secure lower interest rates and hedge exchange risks.",
      "Preserve local working capital limits for standard domestic operations.",
      "Seamless conversion from Pre-Shipment finance to Post-Shipment loan lines."
    ],
    features: [
      "Rupee Pre-Shipment Credit: Competitive financing structured in Indian Rupees.",
      "PCFC Credit Lines: Fund exports in USD, EUR, GBP, or JPY based on currency availability.",
      "Order-Linked Advances: Access cash directly tied to confirmed export contracts."
    ],
    eligibility: [
      "Valid Import-Export Code (IEC) and registrations.",
      "Confirmed export order or an active LC from an approved buyer.",
      "Clear track record with Export Credit Guarantee Corporation (ECGC).",
      "Stable manufacturing or procurement capacity."
    ],
    howItWorks: [
      { step: 1, title: "Export Order Presentation", desc: "Submit export contract details, purchase orders, or buyers' Letter of Credit." },
      { step: 2, title: "Currency & Limit Choice", desc: "Select Rupee Credit or PCFC depending on interest rate benefits and currency requirements." },
      { step: 3, title: "Advance Drawdown", desc: "Draw down capital to purchase raw materials, pay factory operations, and pack goods." },
      { step: 4, title: "Export & Liquidation", desc: "Ship goods, submit export bills, and liquidate the credit using incoming foreign payments." }
    ],
    faqs: [
      {
        question: "What are the benefits of PCFC?",
        answer: "PCFC (Packing Credit in Foreign Currency) allows you to borrow at international Libor/SOFR linked rates (which are often much lower than domestic rates) and repay using export sales in the same currency, eliminating currency conversion costs."
      },
      {
        question: "How is the packing credit loan liquidated?",
        answer: "Once goods are shipped, the exporter presents the shipping bills to the bank. The bank converts the pre-shipment loan into a post-shipment bill discounting facility or pays it off directly from incoming buyer funds."
      }
    ],
    whyChooseUs: "We guide exporters through the documentation process, ensuring compliance with RBI export guidelines and securing low-cost PCFC lines from top international desks.",
    relatedServices: ["letter-of-credit", "bank-guarantee", "working-capital-solutions"]
  },

  "machinery-purchase-finance": {
    id: "machinery-purchase-finance",
    title: "Machinery Purchase Finance",
    subtitle: "Capital Investment Funding for Industrial & Manufacturing Gear",
    icon: Factory,
    bannerImage: "/machinery-finance-detail.jpeg",
    overview: "Machinery Purchase Finance is a dedicated asset-backed funding program designed to help manufacturing, engineering, and logistics companies procure capital equipment without draining their operating cash reserves. In any manufacturing business, upgrading technology and expanding production lines is essential for growth. However, purchasing high-value machinery can severely impact liquidity. Our machinery finance structures allow you to leverage the equipment itself as collateral, securing long-term capital at competitive interest rates and structured tenures that align with your machine's revenue-generation cycle.",
    meta: {
      highlights: [
        "Funding for domestic purchases and imported machinery",
        "Asset hypothecation: The machine itself acts as primary security",
        "LTV options up to 80-90% of the machinery cost",
        "Extended repayment tenures up to 7 years",
        "Competitive interest rates tailored to manufacturing industries"
      ]
    },
    benefits: [
      "Acquire production machinery while preserving working capital.",
      "Access low-interest secured lending with the equipment acting as primary collateral.",
      "Benefit from corporate tax deductions through machinery depreciation and interest write-offs.",
      "Optimize cash flows by matching payment plans with production output milestones."
    ],
    features: [
      "Import Machinery Funding: Finance imported equipment, including customs duties and shipping logistics.",
      "Refurbished Equipment Finance: Secure loans for pre-owned or certified refurbished industrial machinery.",
      "Capex Term Loans: Medium-to-long term structures for complete factory automation setup."
    ],
    eligibility: [
      "Minimum 3 years of manufacturing/industrial operations.",
      "Detailed project report or projection sheet showing machine utility.",
      "Stable business financials with positive cash flows.",
      "Valid vendor quotation and manufacturer technical specifications."
    ],
    howItWorks: [
      { step: 1, title: "Quotation Submission", desc: "Provide physical invoices or official proforma quotes from certified machinery manufacturers." },
      { step: 2, title: "Project Evaluation", desc: "Our credit team assesses the projected production capacity increase and payback cycle." },
      { step: 3, title: "Margin Structuring", desc: "Confirm the margin deposit (typically 10-20%) and establish direct payment terms with the manufacturer." },
      { step: 4, title: "Lender Payout", desc: "Direct disbursal to the machinery manufacturer, followed by installation and hypothecation registration." }
    ],
    faqs: [
      {
        question: "Can I finance imported machinery?",
        answer: "Yes. We structure machinery import financing, including Letters of Credit and buyer's credit facilities to manage international supplier payouts."
      },
      {
        question: "Is collateral other than the machine required?",
        answer: "In many cases, the machine itself serves as the primary security. Depending on the loan size and company financial profile, additional collateral or director guarantees may be requested."
      }
    ],
    whyChooseUs: "We understand industrial asset life cycles. We help structure your application to secure approvals from lenders who specialize in manufacturing sectors, avoiding delays.",
    relatedServices: ["business-loans", "working-capital-solutions", "machinery-purchase-finance"]
  },

  "medical-equipment-finance": {
    id: "medical-equipment-finance",
    title: "Medical Equipment Finance",
    subtitle: "Custom Credit for Hospitals, Diagnostics & Healthcare Providers",
    icon: Stethoscope,
    bannerImage: "/medical-finance-detail.jpeg",
    overview: "Medical Equipment Finance provides specialized funding tailored for hospitals, diagnostic labs, scanning centers, and individual medical practitioners to acquire high-value healthcare equipment. From MRI and CT scanners to dental chairs, ultrasound equipment, and intensive care units, modern medicine demands cutting-edge technology. Our customized leasing and loan options ensure you can equip your facility with advanced technology while maintaining optimal liquidity for everyday hospital management and patient care.",
    meta: {
      highlights: [
        "Financing for diagnostic, surgical, and life-support machinery",
        "Preferential interest rates for healthcare institutions and doctors",
        "LTV options up to 90% of equipment cost, including installation",
        "Flexible repayment terms up to 7 years",
        "Structured loan structures for new setups and expansions"
      ]
    },
    benefits: [
      "Equip your hospital with advanced technology without massive capital outlay.",
      "Enjoy lower interest rates designed specifically for medical professions.",
      "Preserve operational cash for staff salaries, inventory, and facility management.",
      "Access customized terms matched to diagnostic scanning volume forecasts."
    ],
    features: [
      "Diagnostic Center Funding: Set up complete radiology or pathology laboratory suites.",
      "Medical Lease Options: Rent expensive equipment with flexible end-of-term purchase choices.",
      "Hosp-Tech Capital: Large-scale term loans for hospital construction and bed expansion."
    ],
    eligibility: [
      "Qualified Medical Practitioner (MBBS, MD, MS) or registered healthcare entity.",
      "Minimum 3 years of clinical practice or hospital operations.",
      "Stable revenue streams from consultations, diagnostic services, or bed charges.",
      "Valid manufacturer quotation and equipment service contract agreements."
    ],
    howItWorks: [
      { step: 1, title: "Quote Evaluation", desc: "Provide official equipment quotations, technical specifications, and maintenance agreements." },
      { step: 2, title: "Eligibility Assessment", desc: "Review practice track records, hospital bed-turnover, and credit history." },
      { step: 3, title: "Sanction Design", desc: "Formulate loan or lease agreements with structured margins and monthly payments." },
      { step: 4, title: "Direct Payout", desc: "Disbursal is made directly to the medical equipment distributor, followed by installation verification." }
    ],
    faqs: [
      {
        question: "Do you finance imported medical devices?",
        answer: "Yes. We arrange trade limits, import LCs, and final equipment financing for high-end diagnostic machines from global manufacturers."
      },
      {
        question: "Can individual doctors get special terms?",
        answer: "Yes. Practicing doctors receive preferential interest rates and simplified approval processes based on their professional qualification credentials."
      }
    ],
    whyChooseUs: "We maintain active collaborations with top medical leasing and credit desks, ensuring healthcare providers get the fastest approvals and lowest rates in the market.",
    relatedServices: ["professional-loans", "business-loans", "loan-against-property"]
  }
};
