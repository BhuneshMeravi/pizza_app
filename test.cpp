#include <iostream>
#include <vector>

using namespace std;

int findMax(vector<int>& nums){
        int max = nums[0];
        for(int i=0; i<nums.size(); i++){
            if(max < nums[i])
                max = nums[i];
        }
        return max;
    }

int main()
{
  vector<int> nums;
  for (int i = 0; i < nums.size(); i++)
  {
    cin>>nums[i];
  }
  cout<<"maximum value of the array is "
} 