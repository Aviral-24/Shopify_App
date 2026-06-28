const Announcement = require("../models/Announcement");

exports.saveAnnouncement = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // 1. Save announcement in MongoDB (audit history)
    const announcement = await Announcement.create({ text });

    // 2. Update Shopify store metafield via Admin GraphQL API
    const query = `
      mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields { id namespace key value }
          userErrors { field message }
        }
      }
    `;

 const variables = {
  metafields: [
    {
      ownerId: "gid://shopify/Shop/105051979936", 
      namespace: "my_app",
      key: "announcement",
      type: "single_line_text_field",
      value: text,
    },
  ],
};

    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2026-04/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const data = await response.json();
    // You could check data.metafieldsSet.userErrors here

    res.status(201).json({ success: true, announcement, shopify: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
