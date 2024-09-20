"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon, DownloadIcon } from "@radix-ui/react-icons"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

// Mock data for the charts
const generateApplicationData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    name: `Day ${i + 1}`,
    pending: Math.floor(Math.random() * 100) + 50,
    approved: Math.floor(Math.random() * 80) + 40,
    rejected: Math.floor(Math.random() * 30) + 10,
  }))
}

const resourcesData = [
  { name: "Applications", value: 30 },
  { name: "Staff", value: 50 },
  { name: "Hardware", value: 20 },
]

const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];

const recentApplications = [
  { id: "APP001", applicant: "Ram Singh", type: "Birth Certificate", status: "Pending", date: "2023-06-15" },
  { id: "APP002", applicant: "Krishna Sharma", type: "Caste Certificate", status: "Approved", date: "2023-06-14" },
  { id: "APP003", applicant: "Priya Tiwari", type: "Income Certificate", status: "Rejected", date: "2023-06-13" },
  { id: "APP004", applicant: "Anuj Tripathi", type: "Domicile Certificate", status: "Pending", date: "2023-06-12" },
  { id: "APP005", applicant: "Vivek Singh", type: "Birth Certificate", status: "Approved", date: "2023-06-11" },
]

const priorityApplications = [
  { id: "PRI001", applicant: "Shiva Yadav", type: "Birth Certificate", status: "Urgent", date: "2023-06-15" },
  { id: "PRI002", applicant: "Nikhil Kumar", type: "Caste Certificate", status: "High Priority", date: "2023-06-14" },
  { id: "PRI003", applicant: "Himangi Shukla", type: "Income Certificate", status: "Urgent", date: "2023-06-13" },
]

const applicationTypes = {
  all: { total: 1234, pending: 160, approved: 130, rejected: 30 },
  birth: { total: 500, pending: 70, approved: 50, rejected: 10 },
  caste: { total: 300, pending: 40, approved: 30, rejected: 5 },
  income: { total: 250, pending: 30, approved: 25, rejected: 8 },
  domicile: { total: 184, pending: 20, approved: 25, rejected: 7 },
}

const Dashboard =()=> {
  const [role, setRole] = useState("clerk")
  const [timeRange, setTimeRange] = useState("7days")
  const [applicationType, setApplicationType] = useState("all")
  const [stats, setStats] = useState(applicationTypes.all)
  const [applicationData, setApplicationData] = useState(generateApplicationData(7))

  useEffect(() => {
    setStats(applicationTypes[applicationType as keyof typeof applicationTypes])
  }, [applicationType])

  useEffect(() => {
    setApplicationData(generateApplicationData(timeRange === "7days" ? 7 : 30))
  }, [timeRange, applicationType])

  const handleDownloadReport = () => {
    console.log("Downloading report...")
    setRole("clerk")

  }

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/settings" className="mr-4">
            <span className="sr-only">Settings</span>
          </Link>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <div className="ml-auto flex items-center space-x-4">
            {/* <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clerk">Clerk/Staff</SelectItem>
                <SelectItem value="subdivision">Subdivision Officer</SelectItem>
                <SelectItem value="district">District Officer</SelectItem>
                <SelectItem value="central">Central Officer</SelectItem>
              </SelectContent>
            </Select> */}
            <Button onClick={handleDownloadReport}>
              <DownloadIcon className="mr-2 h-4 w-4" /> <a href="./Report.html" download={"Report.csv"}> Download Report</a>
            </Button>
            <Button asChild variant={"destructive"}>
               <Link href="/" >Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="overview" className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <div  className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled={role === "clerk"}>Analytics</TabsTrigger>
            </TabsList>
          </div>
          <Select value={applicationType} onValueChange={setApplicationType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Application Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="birth">Birth Certificate</SelectItem>
              <SelectItem value="caste">Caste Certificate</SelectItem>
              <SelectItem value="income">Income Certificate</SelectItem>
              <SelectItem value="domicile">Domicile Certificate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                <StopwatchIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">+10.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Applications</CardTitle>
                <CheckCircledIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approved}</div>
                <p className="text-xs text-muted-foreground">+19.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected Applications</CardTitle>
                <CrossCircledIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rejected}</div>
                <p className="text-xs text-muted-foreground">+4.1% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 max-md:col-span-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Application Overview</CardTitle>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pending" fill="#3498db" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="approved" fill="#2ecc71" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rejected" fill="#e74c3c" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3 max-md:col-span-6">
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={resourcesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {resourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-center space-x-4">
                  {resourcesData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span>{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
          <Card>
              <CardHeader>
                <CardTitle>Priority Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priorityApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.id}</TableCell>
                        <TableCell>{app.applicant}</TableCell>
                        <TableCell>{app.type}</TableCell>
                        <TableCell>{app.status}</TableCell>
                        <TableCell>{app.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.id}</TableCell>
                        <TableCell>{app.applicant}</TableCell>
                        <TableCell>{app.type}</TableCell>
                        <TableCell>{app.status}</TableCell>
                        <TableCell>{app.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Application Tren</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={applicationData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pending" stroke="#3498db" />
                    <Line type="monotone" dataKey="approved" stroke="#2ecc71" />
                    <Line type="monotone" dataKey="rejected" stroke="#e74c3c" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Application Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <span className="w-4 h-4 bg-[#3498db] rounded-full"></span>
                      <span>Pending</span>
                    </div>
                    <span className="ml-auto text-sm font-medium">45%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <span className="w-4 h-4 bg-[#2ecc71] rounded-full"></span>
                      <span>Approved</span>
                    </div>
                    <span className="ml-auto text-sm font-medium">35%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <span className="w-4 h-4 bg-[#e74c3c] rounded-full"></span>
                      <span>Rejected</span>
                    </div>
                    <span className="ml-auto text-sm font-medium">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard