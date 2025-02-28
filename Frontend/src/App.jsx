import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import ContactUs from "./Components/ContactUs";
import EventsCalendar from "./Components/EventsCalendar";
import FeedbackReview from "./admin/FeedbackReview";
import HomePage from "./Components/HomePage";
import SignUpLoginPage from "./Components/SignUpLoginPage";
import SubmitVolunteerHours from "./Components/SubmitVolunteerHours";
import TermsPrivacy from "./Components/TermsPrivacy";
import Testimonials from "./Components/Testimonials";
import VolunteerDashboard from "./Components/VolunteerDashboard";
import MyProfile from "./Components/MyProfile";
import VolunteerOpportunities from "./Components/VolunteerOpportunities";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Profile from './Components/Profile';
import ManageVolunteers from './admin/ManageVolunteers';
import ManageEvents from './admin/ManageEvents';
import EventDetails from './admin/EventDetails';
import ApproveHours from './admin/ApproveHours';
import ManageFeedback from './admin/ManageFeedback';
import ManageTestimonials from './admin/ManageTestimonials';
import PasswordReset from "./Components/PasswordReset";
import ViewHistory from "./Components/ViewHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignUpLoginPage />} />
        <Route path="/events" element={<EventsCalendar />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/feedback" element={<FeedbackReview />} />
        <Route path="/terms" element={<TermsPrivacy />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/submit-hours/:volunteerId" element={<SubmitVolunteerHours />} />
        <Route path="/volunteer-opportunities" element={<VolunteerOpportunities />} />
        <Route path="/manage-volunteers" element={<ManageVolunteers />} />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/profile/:volunteerId" element={<Profile />} />
        <Route path="/approve-hours" element={<ApproveHours />} />
        <Route path="/manage-feedback" element={<ManageFeedback />} />
        <Route path="/manage-testimonials" element={<ManageTestimonials />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/view-history" element={<ViewHistory />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;