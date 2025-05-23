
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Clock, BarChart3, Calendar, MessageCircle } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  const upcomingClasses = [
    { id: 1, title: 'Advanced Mathematics', time: '2:00 PM', students: 24 },
    { id: 2, title: 'Physics Lab Session', time: '4:00 PM', students: 18 },
  ];

  const recentActivity = [
    { id: 1, action: 'Quiz completed by 15 students', subject: 'Mathematics', time: '1 hour ago' },
    { id: 2, action: 'New question submitted', subject: 'Physics', time: '2 hours ago' },
    { id: 3, action: 'Class attendance recorded', subject: 'Chemistry', time: '3 hours ago' },
  ];

  const stats = [
    { label: 'Total Students', value: '156', icon: Users, color: 'bg-blue-500' },
    { label: 'Classes Today', value: '4', icon: Calendar, color: 'bg-green-500' },
    { label: 'Avg. Engagement', value: '87%', icon: BarChart3, color: 'bg-purple-500' },
    { label: 'Pending Reviews', value: '12', icon: Clock, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👨‍🏫</h1>
        <p className="text-green-100">Ready to inspire minds today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color} mr-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Lesson
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Class
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium">{classItem.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {classItem.time} • {classItem.students} students enrolled
                  </p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">Prepare</Button>
                  <Button size="sm">Start Class</Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.subject} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
