
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, MessageCircle, BarChart3, Bell } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const upcomingClasses = [
    { id: 1, title: 'Advanced Mathematics', time: '2:00 PM', teacher: 'Dr. Smith' },
    { id: 2, title: 'Physics - Mechanics', time: '4:00 PM', teacher: 'Prof. Johnson' },
    { id: 3, title: 'Chemistry Lab', time: '10:00 AM Tomorrow', teacher: 'Dr. Brown' },
  ];

  const recentTopics = [
    { id: 1, title: 'Quadratic Equations', date: '2 hours ago' },
    { id: 2, title: 'Newton\'s Laws', date: '1 day ago' },
    { id: 3, title: 'Chemical Bonding', date: '2 days ago' },
  ];

  const notifications = [
    { id: 1, message: 'New assignment posted for Mathematics', time: '30 min ago' },
    { id: 2, message: 'Physics class rescheduled to 4:30 PM', time: '1 hour ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Hello, {user?.name}! 👋</h1>
        <p className="text-blue-100">Ready to learn something new today?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium">{classItem.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {classItem.teacher} • {classItem.time}
                  </p>
                </div>
                <Button size="sm">Join</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Assistant Shortcut */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              AI Assistant
            </CardTitle>
            <CardDescription>
              Get instant help with your studies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  "How do I solve quadratic equations?"
                </p>
              </div>
              <Button className="w-full" variant="outline">
                Ask AI Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Topics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Recent Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTopics.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">{topic.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{topic.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">View Notes</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="h-5 w-5 mr-2" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quizzes Completed</span>
                    <span>12/15</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-2 text-sm border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900">
                    <p className="text-gray-700 dark:text-gray-300">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
