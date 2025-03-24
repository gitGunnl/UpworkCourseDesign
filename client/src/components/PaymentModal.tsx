import { useState } from "react";
import { Course } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

const PaymentModal = ({ isOpen, onClose, course }: PaymentModalProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  if (!isOpen || !course) return null;

  const taxAmount = course.price * 0.1;
  const totalAmount = course.price + taxAmount;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          <span className="material-icons">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
            <span className="material-icons text-primary-600">
              shopping_cart
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Complete Your Purchase
          </h3>
          <p className="text-gray-500">{course.title}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-500">Course Price</span>
            <span className="font-semibold text-gray-900">
              ${course.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-500">Tax</span>
            <span className="font-semibold text-gray-900">
              ${taxAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3 font-bold">
            <span>Total</span>
            <span className="text-primary-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div
              className={`border rounded-md p-2 flex items-center justify-center cursor-pointer ${
                selectedPaymentMethod === "card"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedPaymentMethod("card")}
            >
              <span
                className={`material-icons ${
                  selectedPaymentMethod === "card"
                    ? "text-primary-600"
                    : "text-gray-900"
                }`}
              >
                credit_card
              </span>
            </div>
            <div
              className={`border rounded-md p-2 flex items-center justify-center cursor-pointer ${
                selectedPaymentMethod === "bank"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedPaymentMethod("bank")}
            >
              <span
                className={`material-icons ${
                  selectedPaymentMethod === "bank"
                    ? "text-primary-600"
                    : "text-gray-900"
                }`}
              >
                account_balance
              </span>
            </div>
            <div
              className={`border rounded-md p-2 flex items-center justify-center cursor-pointer ${
                selectedPaymentMethod === "payment"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedPaymentMethod("payment")}
            >
              <span
                className={`material-icons ${
                  selectedPaymentMethod === "payment"
                    ? "text-primary-600"
                    : "text-gray-900"
                }`}
              >
                payment
              </span>
            </div>
            <div
              className={`border rounded-md p-2 flex items-center justify-center cursor-pointer ${
                selectedPaymentMethod === "wallet"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedPaymentMethod("wallet")}
            >
              <span
                className={`material-icons ${
                  selectedPaymentMethod === "wallet"
                    ? "text-primary-600"
                    : "text-gray-900"
                }`}
              >
                account_balance_wallet
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input
                  id="expiry-date"
                  placeholder="MM/YY"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" className="mt-1" />
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full py-3">Complete Purchase</Button>
      </div>
    </div>
  );
};

export default PaymentModal;
