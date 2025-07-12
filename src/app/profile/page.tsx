
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, User, Home, Settings, Trash2 } from "lucide-react"
import { listings } from "@/lib/mock-data"
import ListingCard from "@/components/listing-card"
import { Separator } from "@/components/ui/separator"

const tabs = [
  { id: "profile", label: "Edit Profile", icon: User },
  { id: "listings", label: "My Listings", icon: Home },
  { id: "settings", label: "Account Settings", icon: Settings },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("profile")
  const userListings = listings.slice(0, 3) // Mock data for user's listings

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information and profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://placehold.co/200x200.png" data-ai-hint="person" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload New Photo</Button>
               </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName">First Name</label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName">Last Name</label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="bio">Bio</label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a little about yourself"
                  defaultValue="Property owner and real estate enthusiast based in Metropolis. Committed to providing quality, verified rental homes."
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        )
      case "listings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>An overview of the properties you have listed on RentVerify.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {userListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} layout="list" />
               ))}
            </CardContent>
          </Card>
        )
      case "settings":
        return (
          <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password for better security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="current-password">Current Password</label>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <label htmlFor="new-password">New Password</label>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <label htmlFor="confirm-password">Confirm New Password</label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Update Password</Button>
                </CardFooter>
            </Card>
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account and all associated data. This action cannot be undone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        I understand, delete my account
                    </Button>
                </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          My Profile
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your account details and properties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="flex flex-col space-y-2 sticky top-24">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {tab.label}
                </Button>
              )
            })}
          </nav>
        </aside>

        <main className="md:col-span-3">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
