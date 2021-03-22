import DataPrivacy from "./Data.privacy";
import { DisclosuresPrivacy } from "./Disclosures.privacy";
import { HowWeUseData } from "./HowData.privacy";
const termsPageData = {
  title: "Privacy Policy",
  date: "01/01/2021 by Ceddy Muhoza",
  content: [
    {
      id: "1",
      title: "PERSONAL DATA COLLECTED",
      description: DataPrivacy,
    },
    {
      id: "2",
      title: "HOW WE USE YOUR INFORMATION",
      description: HowWeUseData,
    },
    {
      id: "3",
      title: "DISCLOSURES OF PERSONAL INFORMATION",
      description: DisclosuresPrivacy,
    },
    {
      id: "4",
      title: "Accessing your Personal Data",
      description:
        "<p>You may request access to your personal information collected by us, and ask that we correct that personal information. You can ask for access or correction by contacting us and we will usually respond within 30 days. If we refuse to give you access to, or correct, your personal information, we will notify you in writing setting out the reasons.</p>",
    },
    {
      id: "5",
      title: "Complaints",
      description:
        "<p>If you believe your privacy has been breached or you have a complaint about how we have handled your personal information, please contact us in writing.  We will respond within a reasonable period (usually within 30 days).</p>",
    },
    {
      id: "6",
      title: "Owner and Data Controller",
      description:
        "<p>The Commons<br>20-40 Meagher St,<br>Chippendale NSW 2008<br>Australia<br><br>Email: hello@littleandbig.com.au</p>",
    },
  ],
};

export default termsPageData;
