
import React, { useState, useEffect } from 'react';
import { ChinaMap } from './components/ChinaMap';
import { Sidebar } from './components/Sidebar';
import { StatsCards } from './components/StatsCards';
import { ContactsState, Contact } from './types';
import { MapPin } from 'lucide-react';

const PROVINCES_LIST = [
  "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省",
  "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省",
  "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省",
  "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区",
  "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区", "台湾省"
];

const App: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [contacts, setContacts] = useState<ContactsState>(() => {
    const saved = localStorage.getItem('huayu-contacts-v2');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('huayu-contacts-v2', JSON.stringify(contacts));
  }, [contacts]);

  const handleProvinceSelect = (provinceId: string) => {
    setSelectedProvince(provinceId || null);
  };

  const addContact = (provinceId: string, contact: Omit<Contact, 'id' | 'addedAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9),
      addedAt: Date.now(),
    };
    setContacts((prev) => ({
      ...prev,
      [provinceId]: [...(prev[provinceId] || []), newContact],
    }));
  };

  const removeContact = (provinceId: string, contactId: string) => {
    setContacts((prev) => ({
      ...prev,
      [provinceId]: (prev[provinceId] || []).filter((c) => c.id !== contactId),
    }));
  };

  const totalContacts = Object.values(contacts).reduce((acc, curr) => acc + (curr as Contact[]).length, 0);
  const activeProvincesCount = Object.keys(contacts).filter(id => (contacts[id] as Contact[]).length > 0).length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fbfbfd]">
      <main className={`flex-1 relative flex flex-col h-screen overflow-hidden transition-all duration-500 ease-in-out`}>
        <header className="px-8 py-6 flex justify-between items-center glass sticky top-0 z-30 border-b border-gray-100/50">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f]">联络图</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select 
                value={selectedProvince || ''}
                onChange={(e) => handleProvinceSelect(e.target.value)}
                className="appearance-none pl-10 pr-10 py-2.5 bg-[#f5f5f7] rounded-full text-sm font-medium outline-none focus:ring-2 focus:ring-[#0071e3]/20 border-none transition-all cursor-pointer"
              >
                <option value="">快速跳转省份...</option>
                {PROVINCES_LIST.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-start p-6 md:p-8 overflow-y-auto">
          <div className="w-full max-w-5xl space-y-6 md:space-y-8 pb-20">
            <StatsCards total={totalContacts} provinces={activeProvincesCount} />
            
            <div className="w-full bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden relative" style={{ height: 'calc(100vh - 320px)', minHeight: '500px' }}>
               <ChinaMap 
                onProvinceSelect={handleProvinceSelect} 
                selectedProvince={selectedProvince}
                contacts={contacts}
              />
            </div>

            <div className="text-center py-4 text-[10px] text-[#86868b] font-medium uppercase tracking-[0.2em] opacity-40">
              个人联络地图工具
            </div>
          </div>
        </div>
      </main>

      {/* 侧边栏改为条件渲染，并配合动画效果 */}
      <Sidebar 
        provinceId={selectedProvince} 
        contacts={selectedProvince ? contacts[selectedProvince] || [] : []}
        onAddContact={(contact) => selectedProvince && addContact(selectedProvince, contact)}
        onRemoveContact={(id) => selectedProvince && removeContact(selectedProvince, id)}
        onClose={() => setSelectedProvince(null)}
      />
    </div>
  );
};

export default App;
