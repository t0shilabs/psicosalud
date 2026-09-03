'use client'
import "./globals.css";
import {Navbar} from "@/app/components/Navbar";
import {Footer} from "@/app/components/Footer";
import {RegisterPsychologistModal} from "@/app/components/RegisterPsychologistModal";
import {RegisterPatientModal} from "@/app/components/RegisterPatientModal";
import {MyAppointmentsModal} from "@/app/components/MyAppointmentsModal";
import {LoginModal} from "@/app/components/LoginModal";
import {ClinicProvider} from "@/app/context/ClinicContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
          {/* Toast Notification Alert */}


          {/* Main Navigation Bar */}
          <ClinicProvider>
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Modals */}
            <RegisterPsychologistModal />
            <RegisterPatientModal />
            <MyAppointmentsModal />
            <LoginModal />
          </ClinicProvider>
        </div>
      </body>
    </html>
  );
}
