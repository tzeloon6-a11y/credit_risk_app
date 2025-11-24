// frontend/components/MicroBusinessLoanForm.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Import the components you installed from shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function MicroBusinessLoanForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    applicantId: "",
    annualTurnover: "",
    requestedAmount: "",
    loanEssay: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSend = {
      applicant_id: formData.applicantId,
      // Group structured data for the backend Pydantic model
      structured_data: {
        annual_turnover: parseFloat(formData.annualTurnover),
        requested_amount: parseFloat(formData.requestedAmount),
        // Add other fields (e.g., Years in Business) as you expand the form
      },
      loan_essay: formData.loanEssay,
      // For the hackathon demo, we simulate the bank statement text
      bank_statement_text: "Simulated: Applicant shows consistent daily sales deposits averaging RM 200/day for 3 months, with monthly supplier payments of RM 1,500.",
    };

    try {
      // 1. Initiate the API call to your FastAPI backend
      const response = await fetch('/api/v1/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 2. The backend handles the Gemini call and returns the structured JSON report
      const result = await response.json();

      // 3. For now, we only care about navigating to the results page
      // In a later step (Task 3.1), you will pass the result or store it for retrieval.
      console.log("AI Report Received:", result);

      // Navigate to the results page. The `loading.tsx` skeleton will show instantly.
      router.push(`/results/${formData.applicantId}`);

    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to get AI report. See console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Micro-Business Loan Application</CardTitle>
        <CardDescription>Enter the applicant's financial data and their business pitch for AI analysis.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full items-center gap-6">

          {/* Applicant ID */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="applicantId">Applicant ID</Label>
            <Input
              id="applicantId"
              placeholder="e.g., MY-890101-14-5566"
              value={formData.applicantId}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Annual Turnover (Structured Data) */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="annualTurnover">Annual Turnover (RM)</Label>
            <Input
              id="annualTurnover"
              type="number"
              placeholder="e.g., 85000"
              value={formData.annualTurnover}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Requested Amount (Structured Data) */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="requestedAmount">Requested Amount (RM)</Label>
            <Input
              id="requestedAmount"
              type="number"
              placeholder="e.g., 50000"
              value={formData.requestedAmount}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Loan Essay (Unstructured Data for AI) */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="loanEssay">Loan Essay / Business Plan</Label>
            <Textarea
              id="loanEssay"
              placeholder="Explain your business model, why you need this capital, and how you will generate returns to repay the loan."
              rows={5}
              value={formData.loanEssay}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Submit for AI Analysis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Don't forget to import this component into your main page (e.g., app/page.tsx) to render it!