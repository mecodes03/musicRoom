"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Youtube,
  Music,
  Home,
  Search,
  Library,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export default function MusicHub() {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Enhanced Sidebar */}
      <aside className="w-64 bg-card p-6 flex flex-col border-r border-border">
        <h1 className="text-3xl font-bold mb-8 text-primary">MusicHub</h1>
        <ScrollArea className="flex-1 -mx-4">
          <div className="px-4">
            <nav className="space-y-4 mb-8">
              <Button
                variant={activeTab === "home" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("home")}
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
              <Button
                variant={activeTab === "search" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("search")}
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
              <Button
                variant={activeTab === "library" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("library")}
              >
                <Library className="mr-2 h-5 w-5" />
                Your Library
              </Button>
            </nav>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-muted-foreground">
                Your Playlists
              </h2>
              {["Favorites", "Chill Vibes", "Workout Mix", "Study Session"].map(
                (playlist) => (
                  <Button
                    key={playlist}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                  >
                    {playlist}
                  </Button>
                ),
              )}
            </div>
          </div>
        </ScrollArea>
        <div className="space-y-4 mt-auto pt-6 border-t border-border">
          <Button className="w-full" variant="outline">
            <Youtube className="mr-2 h-5 w-5 text-red-500" />
            Link YouTube
          </Button>
          <Button className="w-full" variant="outline">
            <Music className="mr-2 h-5 w-5 text-green-500" />
            Link Spotify
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Enhanced Navbar */}
        <header className="bg-card p-4 flex justify-between items-center border-b border-border">
          <div className="flex items-center space-x-4">
            <Input
              className="w-64"
              placeholder="Search for songs, artists..."
              aria-label="Search for songs or artists"
            />
            <Tabs value={activeTab} className="hidden md:block">
              <TabsList>
                <TabsTrigger value="home" onClick={() => setActiveTab("home")}>
                  Home
                </TabsTrigger>
                <TabsTrigger
                  value="search"
                  onClick={() => setActiveTab("search")}
                >
                  Search
                </TabsTrigger>
                <TabsTrigger
                  value="library"
                  onClick={() => setActiveTab("library")}
                >
                  Your Library
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content */}
        <Tabs>
          <div className="flex-1 overflow-auto p-6">
            <TabsContent value="home">
              <h2 className="text-2xl font-bold mb-4">Welcome to MusicHub</h2>
              <p>
                Start by linking your YouTube and Spotify accounts to access all
                your music in one place.
              </p>
            </TabsContent>
            <TabsContent value="search">
              <h2 className="text-2xl font-bold mb-4">Search</h2>
              <p>Search functionality will be implemented here.</p>
            </TabsContent>
            <TabsContent value="library">
              <h2 className="text-2xl font-bold mb-4">Your Library</h2>
              <p>Your linked accounts and playlists will appear here.</p>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer / Player with Seek Bar */}
        <footer className="bg-card p-4 border-t border-border">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="/mus.png?height=48&width=48"
                  alt="Album cover"
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium">Song Title</p>
                  <p className="text-sm text-muted-foreground">Artist Name</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" aria-label="Previous track">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Play">
                  <Play className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Next track">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5" />
                <Slider
                  className="w-24"
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  aria-label="Volume"
                />
              </div>
            </div>
            {/* Seek Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">0:00</span>
              <Slider
                className="flex-1"
                defaultValue={[0]}
                max={100}
                step={1}
                aria-label="Seek"
              />
              <span className="text-sm">3:45</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
