import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Components/Welcome';
import Authentication from "./Components/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/signup" element={<Authentication />} />
        <Route path="/auths" element={<Authentication />} />
        <Route path="/subscriptionPlans" element={<SubscriptionPlans/>} />
        <Route
          path="/subscription"
          element={
            <SubscriptionList
              subscriptions={[
                { id: 1, planId: 101, status: "active", renewalDate: "2025-10-01" },
                { id: 2, planId: 102, status: "pending renewal", renewalDate: "2025-09-20" }
              ]}
              availablePlans={[
                { id: 101, name: "Basic Plan", price: 10, dataQuota: 50, type: "internet" },
                { id: 102, name: "Premium Plan", price: 20, dataQuota: 200, type: "internet" },
                { id: 103, name: "Ultra Plan", price: 30, dataQuota: 500, type: "internet" }
              ]}
              onUpgrade={(subId, planId) => alert(`Upgrade ${subId} to ${planId}`)}
              onDowngrade={(subId, planId) => alert(`Downgrade ${subId} to ${planId}`)}
              onCancel={(subId) => alert(`Cancel ${subId}`)}
              onRenew={(subId) => alert(`Renew ${subId}`)}
            />
          }
        />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/userDashboard" element={<UserDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;