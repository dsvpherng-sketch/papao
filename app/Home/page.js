"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ResponsiveAppBar from '../component/nav.js';
import Sidebar from '../component/Sidebar.js';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'; // ເພີ່ມ Icon ບັນທຶກ
import CancelIcon from '@mui/icons-material/Cancel'; // ເພີ່ມ Icon ຍົກເລີກ
import { Box, Button, Typography, TextField } from '@mui/material';

export default function Page() {
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  
  // --- State ສຳລັບການແກ້ໄຂປະຫວັດ ---
  const [isEditing, setIsEditing] = useState(false);
  const [historyText, setHistoryText] = useState(
    `ຄະນະວຶສະວະກຳສາດ (ຄວສ) ໄດ້ສ້າງຕັ້ງຂື້ນໃນວັນທີ່ 24 ພະຈິກ ປີ 2006 ໃນສົກສຶກສາ 2006-2007 ທີ່ວິທະຍາເຂດບ້ານນາສ້າງເຫວີຍພາຍໃຕ້ລະບົບການສຶກສາ 1+4 ລະດັບປະລິນຍາຕີ; 
    ໃນຊ່ວງເວລານັ້ນໄດ້ເປີດສອນພຽງ 2 ພາກວິຊາຄື: ພາກວິຊາວິສະວະກຳໄຟຟ້າ ແລະ ວິສະວະກຳຄອມພິວເຕີເຊິ່ງມີນັກສຶກສາພຽງ 52 ຄົນ ແລະ ພະນັກງານຄູອາຈານສອນພຽງ 7 ທ່ານ,ປະຈຸບັນ
    ຄະນະວິສະວະກຳສາດປະກອບມີ 4 ພາກວິຊາ 8 ສาຂາວິຊາ(ຫຼັກສູດປະລິນຍາຕີພາກປົກກະຕິ 8 ຫຼັກສູດປະລິນຍາຕີຕໍ່ເນື້ອງ 3 ຫຼັກສູດແລະປະລິນຍາໂທ 1 ຫຼັກສູດ)ພາຍໃຕ້ລະບົບ 0+4 ແລະ
    ປະຈຸບັນຄະນະວິສະວະກຳສາດຕັ້ງຢູ່ໃຈກາງ ແລະ ໃກ້ກັບອະນຸປະທານສຸພານຸວົງ ຂອງມະຫາວິທະຍາໄລສຸພານຸວົງ ທີ່ບ້ານດອນໃໝ່,ນະຄອນຫຼວງພະບາງ,ແຂວງຫຼວງພະບາງ ມີພະນັກງານຄູອາຈານທັງໝົດ 
    50 ທ່ານ ປະລິນຍາໂທ 35 ທ່ານ ປະລິນຍາຕີ 12 ທ່ານແລະໄດ້ສ້າງບຸກຄະລາກອນອອກຮັບໃຊ້ສັງຄົມທັງໝົດ 15 ລຸ້ນ ລວມທັງໝົດ 1816 ຄົນ ຍິງ 364 ຄົນ.`
  );
  const [tempText, setTempText] = useState(""); // ໃຊ້ເກັບຂໍ້ຄວາມຊົ່ວຄາວຂະນະແກ້ໄຂ

  useEffect(() => {
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      const userData = JSON.parse(savedSession);
      setUserRole(userData.role);
      setUserName(userData.name);
    }
  }, []);

  // ເປີດໂໝດແກ້ໄຂ
  const handleEdit = () => {
    setTempText(historyText); // ກັອບປີ້ຂໍ້ຄວາມປະຈຸບັນໄປໃສ່ໂຕແປຊົ່ວຄາວ
    setIsEditing(true);
  };

  // ບັນທຶກການແກ້ໄຂ
  const handleSave = () => {
    setHistoryText(tempText); // ເອົາຂໍ້ຄວາມທີ່ແກ້ໄຂແລ້ວມາສະແດງ
    setIsEditing(false);
    // ໃນອະນາຄົດສາມາດເພີ່ມການ Fetch API ເພື່ອ Save ລົງ Database ບ່ອນນີ້ໄດ້
    alert("ບັນທຶກຂໍ້ມູນສຳເລັດ!");
  };

  return (
    <div>
      <div className="h-20 w-[100dvw] fixed bg-white z-10">
        <ResponsiveAppBar />
        <div className="w-[100dvw] border min-h-[100dvh]">
          <div>
            <div className="w-[80dvw] ml-[240px] pt-20 min-h-[100dvh]">
              <div className="w-[82dvw] mt-16 min-h-[60dvh] max-h-[calc(100dvh-6rem)] p-6 overflow-y-auto overflow-x-hidden">
                
                <Box sx={{ mb: 2, textAlign: 'right', px: 2 }}>
                   <Typography variant="body2" color="textSecondary">
                     ຜູ້ໃຊ້: <strong>{userName}</strong> ({userRole === 'admin' ? 'ຜູ້ດູແລລະບົບ' : userRole === 'dean' ? 'ຄະນະບໍດີ' : 'ສິດເກົ່າ'})
                   </Typography>
                </Box>

                <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
                  {/* ດ້ານຊ້າຍ - Logo */}
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white/80 p-4">
                      <Image
                        src="/icon/logouniversity.jpg"
                        alt="Logo ຄະນະ"
                        width={220}
                        height={220}
                        className="object-contain w-[220px] h-[220px]"
                      />
                    </div>
                  </div>

                  {/* ດ້ານຂວາ */}
                  <div className="flex-1 flex flex-col gap-8 md:gap-10 space-y-2">
                    <section className="rounded-xl bg-white/90 shadow-md p-6 border border-gray-100">
                      <h2 className="text-lg font-semibold text-[#8b0000d7] mb-3 border-b pb-2">ສິດເກົ່າຄະນະວິສະວະກຳສາດ</h2>
                      <p className="text-gray-700 leading-relaxed">
                        ສິດເກົ່າ (ອາດີດນັກສຶກສາ) ເປັນສິດໃນການເຂົ້າເຖິງບໍລິການ ແລະ ຂໍ້ມູນຂອງຄະນະວິຊາ ສຳລັບຜູ້ທີ່ຈົບການສຶກສາແລ້ວ ຫຼື ສະມາຊິກທີ່ກ່ຽວຂ້ອງ.
                      </p>
                    </section>

                    <section className="rounded-xl bg-white/90 shadow-md p-6 border border-gray-100">
                      <h2 className="text-lg font-semibold text-[#8b0000d7] mb-4 border-b pb-2">ຂໍ້ມູນການຕິດຕໍ່</h2>
                      <div className="flex flex-col gap-4">
                        <Box className="flex items-center gap-3 text-gray-700">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8f0fe' }}>
                            <PhoneIcon sx={{ color: '#8B0000', fontSize: 26 }} />
                          </Box>
                          <div><span className="font-semibold text-gray-800">ຕິດຕໍ່:</span> 020 12345678</div>
                        </Box>
                        <Box className="flex items-center gap-3 text-gray-700">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8f0fe' }}>
                            <EmailIcon sx={{ color: '#8B0000', fontSize: 26 }} />
                          </Box>
                          <div><span className="font-semibold text-gray-800">ອີເມວ:</span> contact@faculty.la</div>
                        </Box>
                      </div>
                    </section>

                    {/* --- ສ່ວນທີ່ແກ້ໄຂ: ປະຫວັດຄວາມເປັນມາ --- */}
                    <section className="rounded-xl bg-white/90 shadow-md p-6 border border-gray-100 relative">
                      <div className="flex justify-between items-center mb-3 border-b pb-2">
                        <h2 className="text-lg font-semibold text-[#8b0000d7]">ປະຫວັດຄວາມເປັນມາຂອງຄະນະວິສະວະກຳສາດ</h2>
                        
                        {/* ປຸ່ມຄວບຄຸມສະເພາະ Admin */}
                        {userRole === 'admin' && (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {!isEditing ? (
                              <Button 
                                variant="outlined" size="small" startIcon={<EditIcon />}
                                sx={{ color: '#8B0000', borderColor: '#8B0000' }}
                                onClick={handleEdit}
                              >
                                ແກ້ໄຂ
                              </Button>
                            ) : (
                              <>
                                <Button 
                                  variant="contained" size="small" startIcon={<SaveIcon />}
                                  sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
                                  onClick={handleSave}
                                >
                                  ບັນທຶກ
                                </Button>
                                <Button 
                                  variant="outlined" size="small" startIcon={<CancelIcon />}
                                  sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                                  onClick={() => setIsEditing(false)}
                                >
                                  ຍົກເລີກ
                                </Button>
                              </>
                            )}
                          </Box>
                        )}
                      </div>

                      <div className="text-gray-700 leading-relaxed">
                        {isEditing ? (
                          // ໂໝດແກ້ໄຂ: ສະແດງ TextField
                          <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            value={tempText}
                            onChange={(e) => setTempText(e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: '#fff',
                                fontSize: '15px',
                                lineHeight: '1.6'
                              }
                            }}
                          />
                        ) : (
                          // ໂໝດປົກກະຕິ: ສະແດງຂໍ້ຄວາມ
                          <p style={{ whiteSpace: 'pre-line' }}>{historyText}</p>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[100dvh] w-[20dvw] ">
        <Sidebar />
      </div>
    </div>
  );
}