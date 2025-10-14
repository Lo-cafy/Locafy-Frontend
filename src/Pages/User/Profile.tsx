import ProfileCard from "@/Components/Profile/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import Personal from "@/Components/Profile/Personal";
import Preference from "@/Components/Profile/Prefrence";
import KYC from "@/Components/Profile/Kyc";
import BankDetails from "@/Components/Profile/BankDetails";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50/30 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        <ProfileCard />

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-white border">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="kyc">KYC Proof</TabsTrigger>
            <TabsTrigger value="bank">Bank Details</TabsTrigger>
          </TabsList>

          <TabsContent value="personal"><Personal /></TabsContent>
          <TabsContent value="preferences"><Preference /></TabsContent>
          <TabsContent value="kyc"><KYC /></TabsContent>
          <TabsContent value="bank"><BankDetails/></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
