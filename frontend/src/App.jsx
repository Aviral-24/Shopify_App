import React, { useState } from "react";
import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  Banner,
  BlockStack,
  Text,
  AppProvider,
  Box,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  const [announcementText, setAnnouncementText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSave = async () => {
    if (!announcementText.trim()) {
      setStatusMessage({
        type: "critical",
        text: "Please enter announcement text!",
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/announcement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: announcementText,
          }),
        }
      );

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: "Announcement saved successfully!",
        });
        setAnnouncementText("");
      } else {
        setStatusMessage({
          type: "critical",
          text: "Failed to save announcement.",
        });
      }
    } catch (error) {
      setStatusMessage({
        type: "critical",
        text: "Server error! Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

 return (
  <AppProvider i18n={{}}>
    <div
      style={{
        background: "#f4f7fc",
        minHeight: "100vh",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <Page>
          <Card
            roundedAbove="sm"
            style={{
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#1d4ed8)",
                color: "white",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <Text
                as="h1"
                variant="heading2xl"
                tone="inherit"
              >
                Announcement Dashboard
              </Text>

              <div style={{ marginTop: "10px" }}>
                <Text as="p" tone="inherit">
                  Manage your storefront announcement banner.
                </Text>
              </div>
            </div>

            <Box padding="600">
              <BlockStack gap="500">
                {/* Status */}
                {statusMessage && (
                  <Banner tone={statusMessage.type}>
                    {statusMessage.text}
                  </Banner>
                )}

                {/* Update Banner Card */}
                <div
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "14px",
                    padding: "22px",
                  }}
                >
                  <Text
                    as="h2"
                    variant="headingLg"
                    fontWeight="bold"
                  >
                    <span style={{ color: "#1d4ed8" }}>
                      Update Store Banner
                    </span>
                  </Text>

                  <div style={{ marginTop: "10px" }}>
                    <Text as="p" tone="subdued">
                      Enter the announcement that will be displayed
                      on your Shopify storefront.
                    </Text>
                  </div>
                </div>

                {/* Preview */}
                {announcementText && (
                  <div
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <Text as="p" fontWeight="bold">
                      Preview
                    </Text>

                    <div style={{ marginTop: "8px" }}>
                      <Text as="p">
                        {announcementText}
                      </Text>
                    </div>
                  </div>
                )}

                {/* Textfield */}
                <TextField
                  label="Announcement Text"
                  value={announcementText}
                  onChange={setAnnouncementText}
                  placeholder="Big Sale Today! Get 30% OFF on all products."
                  multiline={4}
                  autoComplete="off"
                />

                {/* Button */}
                <div style={{ marginTop: "10px" }}>
                  <Button
                    variant="primary"
                    size="large"
                    loading={isLoading}
                    onClick={handleSave}
                    fullWidth
                  >
                    Save Announcement
                  </Button>
                </div>
              </BlockStack>
            </Box>
          </Card>
        </Page>
      </div>
    </div>
  </AppProvider>
  );
}