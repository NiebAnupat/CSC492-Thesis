import Link from 'next/link'

import { User, LockIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Home() {

  return (
    <main className="min-h-screen p-8 xl:p-12 flex items-center">
      {/* Login Box */}
      <div className='container p-10 max-w-[28rem] rounded-xl shadow-xl bg-secondary'>

        <form action="" className="flex flex-col items-center gap-y-4 mb-10">
          <h1 className="h4 mb-10">เข้าสู่ระบบ Nied Autism</h1>

          {/* Username */}
          <div className='relative flex items-center w-full'>
            <User className='absolute left-2' size={18} />
            <Input className="placeholder:absolute placeholder:left-8 pl-8" type='name' id='name' placeholder='Name' />
          </div>

          {/* Password */}
          <div className='relative flex items-center w-full'>
            <LockIcon className='absolute left-2' size={18} />
            <Input className="placeholder:absolute placeholder:left-8 pl-8" type='password' id='name' placeholder='Password' />
          </div>

          {/* Forget Password */}
          <div className="w-full flex justify-end">
            <p className='text-sm font-medium leading-none cursor-pointer'>ลืมรหัสผ่าน</p>
          </div>

          <Link href={`/main`} className='w-full'>
            <Button className='w-full mt-6 rounded-full'>เข้าสู่ระบบ</Button>
          </Link>

        </form>

        <div className='w-full h-[1px] bg-gray-400 mb-10'></div>


        {/* Google Login */}
        <Button className='w-full flex items-center gap-2 bg-transparent text-black border-2 hover:bg-slate-300'>
          <img src="./logo_google.svg" alt="google logo" sizes='20px' className='w-8 h-8' />
          เข้าสู่ระบบด้วย Google
        </Button>
      </div>
    </main>
  );
}
