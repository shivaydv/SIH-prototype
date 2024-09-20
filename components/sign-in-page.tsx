'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function SignInPageComponent() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Sign In</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Application Tracking Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id" className="text-gray-700">ID</Label>
              <Input
                id="id"
                type="text"
                placeholder="Enter your ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger id="role" className="bg-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="clerk">Clerk/Staff</SelectItem>
                <SelectItem value="subdivision">Subdivision Officer</SelectItem>
                <SelectItem value="district">District Officer</SelectItem>
                <SelectItem value="central">Central Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button asChild type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
              <Link href="/dashboard" >Sign In</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}