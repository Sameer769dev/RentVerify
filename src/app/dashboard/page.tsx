

"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Eye, MessageSquare, CheckCircle, Percent, Loader2 } from "lucide-react"
import { getUserListings } from "@/lib/firestore"
import type { Listing } from "@/types"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

const chartData = [
  { month: "January", views: 186 },
  { month: "February", views: 305 },
  { month: "March", views: 237 },
  { month: "April", views: 273 },
  { month: "May", views: 209 },
  { month: "June", views: 214 },
]

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
}

export default function DashboardPage() {
  const [myProperties, setMyProperties] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/dashboard');
      return;
    }

    const fetchUserListings = async () => {
      setIsLoading(true);
      try {
        const listings = await getUserListings();
        setMyProperties(listings);
      } catch (error) {
        console.error("Failed to fetch user listings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserListings();
  }, [user, router]);
  
  if (isLoading) {
     return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  const totalListings = myProperties.length;
  // Mocking rented and inquiries data for now
  const rentedListings = totalListings > 0 ? 1 : 0; 
  const occupancyRate = totalListings > 0 ? (rentedListings / totalListings) * 100 : 0;


  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Owner Dashboard
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
            An overview of your property performance.
            </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Views
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,730</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inquiries
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+42</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Listings Rented</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rentedListings}/{totalListings}</div>
              <p className="text-xs text-muted-foreground">
                One new rental this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                Based on your total properties
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Property Views Overview</CardTitle>
              <CardDescription>Monthly views for all your properties.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="views"
                    fill="var(--color-views)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
              <CardDescription>
                A summary of your current listings.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Inquiries</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {myProperties.map(prop => (
                         <TableRow key={prop.id}>
                            <TableCell className="font-medium">{prop.title}</TableCell>
                            <TableCell>
                                <Badge variant={prop.verified ? 'secondary' : 'default'}>
                                    {prop.verified ? 'Verified' : 'Pending'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">0</TableCell>
                        </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
