#include <iostream>
using namespace std;

int main()
{
   int i = 0;
   for (i=0; i<20; i++)
   {
     switch(i)
     {
       case 0:
         i += 5;
         cout << i << " ";
       case 1:
         i += 2;
         cout << i << " ";
       case 5:
         i += 5;
         cout << i << " ";
       default:
         i += 4;
         cout << i << " ";
         break;
     }
     cout << i << " ";
   }
   return 0;
} 